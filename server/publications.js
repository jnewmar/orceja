Meteor.publish('alimentos', function(options) {
  return Alimentos.find({}, options);
});

Meteor.publish('solicitacoesDoComprador', function(id) {
  return Solicitacoes.find({ id_solicitante : id });
});

Meteor.publish('solicitacoes', function() {
  return Solicitacoes.find();
});

Meteor.publish('solicitacao', function(id) {
  return Solicitacoes.find({_id: id});
});

Meteor.publish('solicitacoesRespondidas', function(id) {
  return Orcamentos.find({ id_fornecedor : id });
});

Meteor.publish('orcamentosRecebidos', function(id) {
  return Orcamentos.find({ id_solicitante : id });
});
Meteor.publish('orcamentosDaSolicitacao', function(id) {
  return Orcamentos.find({ id_solicitacao : id });
});
Meteor.publish('SolicitacaoItem', function(id) {
  return SolicitacaoItem.find({ id_solicitacao : id });
});
Meteor.publish('rascunhos', function(id) {
  return Rascunhos.find({ id_solicitante : id });
});

Meteor.publish('orcamentos', function(id) {
  return Orcamentos.find({});
});

Meteor.publish('orcamento', function(id) {
  return Orcamentos.find({_id:id});
});

Meteor.publish('orcamentosParaComprador', function(id) {
  return Orcamentos.find({ id_solicitante : id });
});
	

Meteor.publish("userData", function () {
  if (this.userId) {
    return Meteor.users.find({_id: this.userId},
	{
            fields: {
                profile: 1,
                emails: 1,
                roles: 1                
            }
			
	});
  } else {
    this.ready();
  }
});	

Meteor.publish("listaUsuarios", function() {

    var user = Meteor.users.findOne({
        _id: this.userId
    });


    if (Roles.userIsInRole(user, ["admin","fornecedor","comprador"])) {
        return Meteor.users.find({}, {
            fields: {
                profile: 1,
                emails: 1,
                roles: 1                
            }
        });
    }

    this.stop();
    return;
});








SearchSource.defineSource('alimentos', function(searchText, options) {
  var options = {sort: {data_cadastro: -1}, limit: 20};
 //console.log(" st "+searchText);
  if(searchText!="" && searchText!="*" ) {
    var regExp = buildRegExp(searchText);
    var selector = {descricao: regExp};
    
    return Alimentos.find(selector, options).fetch();
  } else {
    return Alimentos.find({}, options).fetch();
  }
});

function buildRegExp(searchText) {
  // this is a dumb implementation
  var parts = searchText.trim().split(/[\-\:]+/);
  console.log("conso "+parts);
  console.log("reg "+"(" + parts.join('|') + ")");
  return new RegExp("(" + parts.join('|') + ")", "ig");
}
