Template.solicitacoes.helpers({
  lista: function() {

  	o= Orcamentos.find( { id_fornecedor : Meteor.userId() });
  	solicitacoesRespondidas=[];
  	orc={};
	o.forEach(function (row) {
		solicitacoesRespondidas.push(row.id_solicitacao);
		id_solic=row.id_solicitacao;	
		orc[id_solic]=row;
	}); 		
  //  console.log("solicitacoesRespondidass "+JSON.stringify(solicitacoesRespondidas));
  //  console.log("orcs "+JSON.stringify(orc));
    var d = Solicitacoes.find( {} , {sort : {data_cadastro: -1}}).fetch();	
      d.forEach(function (row) {
      	if(jQuery.inArray(row._id,solicitacoesRespondidas) >= 0){
      		row.respondido=true;
      		id_solic=row._id;	
      		row.orcamento=orc[id_solic];
      	}
        row.solicitante=Meteor.users.findOne({_id : row.id_solicitante} );                       
      }); 	
   // console.log("solics "+JSON.stringify(d));
	return d;
  }
});