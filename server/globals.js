Meteor.startup(function () {


	process.env.MAIL_URL = 'smtp://postmaster%40sandboxc0b02307956f47cfb87b436fa00416c2.mailgun.org:2a371ed6a9069d023b561535fe261521@smtp.mailgun.org:587';
//  	console.log("MAIL URL "+process.env.MAIL_URL);
	Accounts.emailTemplates.siteName = "Orcejá";
	Accounts.emailTemplates.from = "Contato Orcejá <william.mori@gmail.com>";
	Accounts.emailTemplates.verifyEmail.subject = function (user) {
	    return "Bem Vindo ao Orcejá, " + user.profile.name;
	};

	Accounts.emailTemplates.verifyEmail.html = function (user, url) {
    url_pix=process.env.ROOT_URL+"pix.png";
		console.log("URL de confirmação "+JSON.stringify(url));
	   return "Ola,"+ user.profile.name+",<br><br>"+
			"Seja muito bem vindo ao Orcejá.<br>"+
			"Para ativar sua conta, por favor confirme seu endereço de email clicando "+	
		    "<a href='"+url+"'>aqui</a>.<br><br>"+
		    "<img src='"+url_pix+"' width='1' height='1'>"+
		    "Atenciosamente<br>"+
		    "Equipe Orcejá";
	};
});

