Template.criarFornecedor.events({	
  'submit #formCadastrar': function(e,t) {
	    e.preventDefault();
		console.log("senha "+document.getElementById('senha').value);
		console.log("email "+document.getElementById('email').value+" "+t.find('#email').value);	
	    var user = {
			email: document.getElementById('email').value,
			password: document.getElementById('senha').value,
			profile: { 
				name: document.getElementById('nome').value,
				telefone: document.getElementById('telefone').value,				
				endereco: document.getElementById('endereco').value,					
				data_cadastro: new Date().getTime() 
			}
	    };
		
			
		console.log("Cadastrando "+JSON.stringify(user));	
		
		Meteor.call("criaFornecedor", user, function(err,result){
			console.log("Resultado Criando Usuario "+JSON.stringify(result));							
			if (err){
	        	alert("Erro: "+err.message);
				console.log("Erros ao tentar criar usuario "+JSON.stringify(err));	
	        }
	        else{
				 Meteor.loginWithPassword(document.getElementById('email').value, 
				 	document.getElementById('senha').value, function(err){
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

					    Router.go('/');			 
				    	//GAnalytics.event("login","fornecedor");  
					}	
				});	
			}
	  	});
	}
});