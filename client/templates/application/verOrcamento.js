Template.verOrcamento.helpers({
 orc: function() {
		

		var o = Orcamentos.findOne( { _id : Router.current().params._id });	
 		o.solicitante = Meteor.users.findOne({_id : o.id_solicitante} )
 		o.solicitante.email=o.solicitante.emails[0].address;
 		o.fornecedor=Meteor.users.findOne({_id : o.id_fornecedor} ); 
		o.fornecedor.email=o.fornecedor.emails[0].address;
        console.log("orcamento "+JSON.stringify(o));		
		return o;
	},	
});

