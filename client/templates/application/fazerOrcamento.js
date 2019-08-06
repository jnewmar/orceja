Template.fazerOrcamento.helpers({
solic : function() {
		

		var s = Solicitacoes.findOne( { _id : Router.current().params._id });	
 		s.solicitante = Meteor.users.findOne({_id : s.id_solicitante} )
 		s.solicitante.email=s.solicitante.emails[0].address;
        console.log("solic "+JSON.stringify(s));		
		return s;
	},	

 lista: function() {
		
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

Template.fazerOrcamento.events({

	'change .valores': function(e) {
		
		//console.log("onchange "+e.target.id+" v"+e.target.value);
		valor_unitario=e.target.value.replace(',', '.');
		valor_unitario=valor_unitario.replace('R$', '');
		id=e.target.id.replace('unitario_', '');
	//	console.log("id "+id);
		qtd=$("#qtd_"+id).val();
	//	console.log("qtd "+qtd);
	//	console.log("valor unitario "+valor_unitario);
		total=valor_unitario*qtd
	//	console.log("total "+total);

		e.target.value=accounting.formatMoney(valor_unitario)
		$("#total_"+id).html(accounting.formatMoney(total));

		total_total=0;
		$( ".total" ).each(function( index ) {
			valor=$( this ).text();//
			//console.log( index + ": " + valor );
			valor=valor.replace('.', '');
			valor=valor.replace('.', '');
			valor=valor.replace('.', '');
			valor=valor.replace(',', '.');
			//console.log( index + ": " + valor );
			valor=valor.replace('R$', '');
		  	console.log( index + ": " + valor );
		  	total_total=Number(total_total)+Number(valor);		  	
		  	console.log( "total atual" + ": " + total_total );
		});
		$("#total_total").html("<b>"+accounting.formatMoney(total_total)+"</b>");
	},		
	'click #enviar-orcamento' : function(e,t) {		
		

		s=Solicitacoes.findOne( { _id : Router.current().params._id })

		o={
			id_solicitacao  : Router.current().params._id ,
			id_fornecedor : Meteor.userId(),
			id_solicitante: s.id_solicitante ,
			data_solicitacao : s.data_cadastro ,
			total : limpa_formatacao($("#total_total").html()) ,
			data_cadastro: new Date() ,	
			itens: []
		};

		
		
		si=SolicitacaoItem.find( { id_solicitacao : Router.current().params._id }).fetch();	
        si.forEach(function (row) {
			tmp={};
			tmp.id_alimento=row.id_alimento;
			tmp.alimento = Alimentos.findOne({_id : row.id_alimento}).descricao;
			tmp.unidade = row.unidade;
			tmp.quantidade = row.quantidade ;
			tmp.valor_unitario = limpa_formatacao($("#unitario_"+row._id).val())
			tmp.valor_total = limpa_formatacao($("#total_"+row._id).html())
			o.itens.push(tmp);
            
        }); 
        console.log("orcamento "+JSON.stringify(o));	
        res=Orcamentos.insert(o);
         if(res){
        Meteor.call('sendEmail',
            "william.mori@gmail.com",
            "william.mori@gmail.com",
            '[ORCEJA] Orçamento Cadastrado',
            'ORC '+JSON.stringify(o, null, 4));
        	Meteor.call('sendEmailOrcRecebido',res,s.id_solicitante);

        	alert('Orçamento Salvo');
        	Router.go("/solicitacoes");
        }else{
        	alert('Erro ao salvar orçamento');
        } 

	}	

});

function limpa_formatacao(str_in){
		str=str_in.toString();
		str=str.replace('R$', '');
		str=str.replace('<b>','');
		str=str.replace('</b>', '');
		str=str.replace('.', '');
		str=str.replace('.', '');
		str=str.replace('.', '');
		str=str.replace(',', '.');
		return str;
}