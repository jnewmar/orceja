Template.minhasSolicitacoes.helpers({
  lista: function() {

    o= Orcamentos.find( { id_solicitante : Meteor.userId() });
    solicitacoesRespondidas=[];
    orc={};
    o.forEach(function (row) {
      solicitacoesRespondidas.push(row.id_solicitacao); 
    });   
   // console.log("solicitacoesRespondidass "+JSON.stringify(solicitacoesRespondidas));
    
    var d = Solicitacoes.find( { id_solicitante : Meteor.userId() }, {sort : {data_cadastro: -1}}).fetch();	
    d.forEach(function (row) {
        if(jQuery.inArray(row._id,solicitacoesRespondidas) >= 0){
          row.tem_orcamento=true;
        }
        row.solicitante=Meteor.users.findOne({_id : row.id_solicitante} );                       
      }); 

   // console.log("solics "+JSON.stringify(d));	
		return d;
  }
});