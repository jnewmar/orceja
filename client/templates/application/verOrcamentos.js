Template.verOrcamentos.helpers({
 lista: function(tp) {

		o=Orcamentos.find({ id_solicitacao : Router.current().params._id }, {sort : {data_cadastro: -1}}).fetch();	
    	o.forEach(function (row) { 	
        	row.fornecedor=Meteor.users.findOne({_id : row.id_fornecedor} );  	      
	    });   
	    console.log("Orcamentos "+JSON.stringify(o));
	
		return o;
	},	
});