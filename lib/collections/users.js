//Users2 = new Mongo.Collection('users');


Meteor.methods({
 criaComprador: function(user){	  
    
	id_usuario=Accounts.createUser(user);	
	Accounts.sendVerificationEmail(id_usuario);
	Meteor.call('sendEmail',
	        "william.mori@gmail.com",
            "william.mori@gmail.com",
            '[ORCEJA] Comprador Criado',
            'USUARIO '+JSON.stringify(user, null, 4));
    return id_usuario && Roles.addUsersToRoles(id_usuario, ["comprador"]);

  },  
  criaFornecedor: function(user){	   	

	id_fornecedor=Accounts.createUser(user);	
	Accounts.sendVerificationEmail(id_fornecedor);
	Meteor.call('sendEmail',
	        "william.mori@gmail.com",
            "william.mori@gmail.com",
            '[ORCEJA] Fornecedor Criado',
            'FORNECEDOR '+JSON.stringify(user, null, 4));
    return id_fornecedor && Roles.addUsersToRoles(id_fornecedor, ["fornecedor"]);
  },  
  
});