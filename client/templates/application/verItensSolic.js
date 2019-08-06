Template.verItensSolic.helpers({
 lista: function(tp) {
		
		var d = SolicitacaoItem.find( { id_solicitacao : Router.current().params._id }).fetch();	
        d.forEach(function (row) {
			row.alimento = Alimentos.findOne({_id : row.id_alimento}).descricao;
			row.unidade = row.unidade;
			row.quantidade = row.quantidade ;
            //console.log(row.alimento);            
        }); 		
		//console.log("DIETA "+d);		
		return d;
	},	
});