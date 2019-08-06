Template.userAccounts.events({
  'click [data-action=logout]': function () {
    AccountsTemplates.logout();
  },
'click #login-buttons-password': function(e) {
		    e.preventDefault();
		    Meteor.loginWithPassword(document.getElementById('at-field-email').value, document.getElementById('at-field-password').value, function(err){
	        if (err){
	        	alert("Erro: "+err.message);
				console.log("Erros ao tentar logar com usuario"+JSON.stringify(err));	
			}	
	        else{
	          	console.log("Logou com sucesso");
				console.log("user "+JSON.stringify(Meteor.user()));	    
				id_usuario=Meteor.userId();
				u=Meteor.user();
				console.log("id user "+id_usuario+" | "+Meteor.userId());  
				//$('#modalLogin').closeModal()

				

			    if (Roles.userIsInRole(u, ['comprador'])) {
			    	//GAnalytics.event("login","CLIENTE");
			     	 Router.go('/home');
			    }
			    if (Roles.userIsInRole(u, ['fornecedor'])) {
			    	//GAnalytics.event("login","fornecedor");
			      	Router.go('/home');
			    }
				if (Roles.userIsInRole(u, ['ADMIN'])) {
					//GAnalytics.event("login","ADMIN");
			      	Router.go('/home');
			    }

				
			}	
	     });		
		
	},	



});
