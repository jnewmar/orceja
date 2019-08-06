Meteor.methods({
  sendEmail: function (to, from, subject, text) {
    check([to, from, subject, text], [String]);

    // Let other method calls from the same client start running,
    // without waiting for the email sending to complete.
    this.unblock();

    Email.send({
      to: to,
      from: from,
      subject: subject,
      html: "<pre>"+text+"</pre>"
    });
  },

sendEmailSolcicRecebida: function (id_solic,fornecedor) {
    
    
    
    nome=fornecedor.profile.name;
    to=fornecedor.emails[0].address;
    from="william.mori@gmail.com";
    subject=nome+",voce recebeu um pedido de orçamento";
    url_base=process.env.ROOT_URL;
    if(url_base.charAt(url_base.length-1)!="/"){
        url_base=url_base+"/";
    }
    url_solic=url_base+"fazerOrcamento/"+id_solic;
    url_pix=url_base+"pix.png";

    html="Ola,"+ nome+",<br><br>"+
    "Voce acaba de receber uma solicitação de orçamento"+
    "Para ver a solicitação click "+  
    "<a href='"+url_solic+"' title='aqui' >aqui</a>"+
    "<img src='"+url_pix+"' width='1' height='1'><br><br>"+
    "Atenciosamente<br>"+
    "Equipe Orcejá";

    console.log("Enviando email de sendEmailSolcicRecebida para "+JSON.stringify(fornecedor));  

    check([to, from, subject, html], [String]);
    this.unblock();
    Email.send({  to: to,    from: from,     subject: subject ,     html: html    });
  }
,
sendEmailOrcRecebido: function (id_orcamento,id_solicitante) {

    
    
    obj_user=Meteor.users.findOne({_id : id_solicitante} );
    nome=obj_user.profile.name;    
    to=obj_user.emails[0].address;
    from="william.mori@gmail.com";
    subject=nome+", voce recebeu um orçamento ";
    url_base=process.env.ROOT_URL;

//    console.log("url "+url_base+" "+url_base.charAt(url_base.length-1));

    if(url_base.charAt(url_base.length-1)!="/"){
        url_base=url_base+"/";
    }

//console.log("url "+url_base+" "+url_base.charAt(url_base.length-1));

    url_orc=url_base+"verOrcamento/"+id_orcamento;
    url_pix=url_base+"pix.png";

    html="Ola,"+ nome+",<br><br>"+
    "Voce acaba de receber um orçamento <br>"+
    "Para ver a proposta click "+  
    "<a href='"+url_orc+"' title='aqui' >aqui</a>"+
    "<img src='"+url_pix+"' width='1' height='1'><br><br>"+
    "Atenciosamente<br>"+
    "Equipe Orcejá";

    console.log("Enviando email de sendEmailOrcRecebido para "+JSON.stringify(obj_user));   

    check([to, from, subject, html], [String]);
    this.unblock();
    Email.send({
      to: to,
      from: from,
      subject: subject ,
      html: html
    });
  }
,
});
