if (Meteor.users.find({}).count() === 0) {
	var users = [
     // {name:"Comprador",email:"comprador@example.com",roles:['comprador']},
     // {name:"Fornecedor",email:"fornecedor@example.com",roles:['fornecedor']},
      {name:"Admin",email:"admin@example.com",roles:['admin']}
    ];

  _.each(users, function (user) {
    var id;

    id = Accounts.createUser({
      email: user.email,
      password: "123456",
	  type: user.type,
      profile: { name: user.name , data_cadastro: new Date().getTime() }
    });

    if (user.roles.length > 0) {
      // Need _id of existing user record so this call must come 
      // after `Accounts.createUser` or `Accounts.onCreate`
      Roles.addUsersToRoles(id, user.roles);
    }
  });	
	
	
	//id_will = Accounts.createUser({
    //  email: "william.mori@gmail.com",
    //  password: "123456",
    //  profile: { name: "William" , data_cadastro: new Date().getTime() }
   // });
	//Roles.addUsersToRoles(id_will, ["admin"]);

}
if (Alimentos.find().count() === 0) {	
	
	var ali = [
	
		{descricao:"Alface" , unidade:"Un"},
		{descricao:"Chicória" , unidade:" Un"},
		{descricao:"Rabanete" , unidade:"Kg"},
		{descricao:"Repolho" , unidade:"Un"},
		{descricao:"Salsa" , unidade:"Maço"},
		{descricao:"Tomate" , unidade:"Kg"},
		{descricao:"Radiche" , unidade:"Un"},
		{descricao:"Cebola" , unidade:"Kg"},
		{descricao:"Alho" , unidade:"Kg"},
		{descricao:"Abacaxi" , unidade:"Un"},
		{descricao:"Maçã" , unidade:"Kg"},
		{descricao:"Vagem" , unidade:"Kg"},
		{descricao:"Melancia" , unidade:"Kg"},
		{descricao:"Abobrinha" , unidade:"Kg"},
		{descricao:"Abóbora" , unidade:"Kg"}
	];  
	
	
	
	var now = new Date().getTime();
	_.each(ali, function (ali) {
	
	
		Alimentos.insert({
			descricao: ali.descricao,
			unidade: ali.unidade,
			data_cadastro: new Date().getTime() 
		});
	});


}

