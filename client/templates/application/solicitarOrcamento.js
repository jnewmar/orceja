var options = {
		  keepHistory: 1000 * 60 * 5,
		  localSearch: true
		};
var fields = ['descricao'];

AlimentosSearch = new SearchSource('alimentos', fields, options);	




Template.solicitarOrcamento.helpers({
	getAlimentos: function() {
		return tmp =AlimentosSearch.getData({
			transform: function(matchText, regExp) {
			return matchText;
			},
			sort: {data_cadastro: -1}
		});		

	},
	isLoading: function() {
		return AlimentosSearch.getStatus().loading;
	},
	alimentosel : undefined,
	getRascunho: function(tp) {
		
		var d = Rascunhos.find( { id_solicitante : Meteor.userId() }).fetch();	
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


Template.layout.events({
	'click #button-solicitar' : function(e) {
		
		s={				
			id_solicitante : Meteor.userId() ,				
			data_cadastro : new Date(),
			itens : []			
		};
		
		res=Solicitacoes.insert(s);
		id_solicitacao=res;
		var d = Rascunhos.find( { id_solicitante : Meteor.userId() }).fetch();	
        d.forEach(function (row) {
        	tmp={		
        		id_solicitacao : id_solicitacao ,		
				id_solicitante : row.id_solicitante ,				
				id_alimento : row.id_alimento, 
				quantidade: row.quantidade ,
				unidade: row.unidade 
			};
			s.itens.push(tmp);
        	res=res && SolicitacaoItem.insert(tmp);
			 Rascunhos.remove( row._id );
			console.log("INSERE SolicitacaoItem "+row.id_alimento);	
        });

        
        if(res){
        	Meteor.call('sendEmail',
            "william.mori@gmail.com",
            "william.mori@gmail.com",
            '[ORCEJA] Solicitação Cadastrada',
            'SOLIC '+JSON.stringify(s, null, 4));


            fornecedores=Meteor.users.find({ roles : { $in: ["fornecedor"] } }, {sort : {createdAt: -1}});
            fornecedores.forEach(function (fornecedor,i) {
                console.log("fornecedor a solicitar "+JSON.stringify(fornecedor));                 
                Meteor.call('sendEmailSolcicRecebida',id_solicitacao,fornecedor );

            });


        	alert('Solicitação Salva');
        	Router.go("/minhasSolicitacoes");
        }else{
        	alert('Erro ao salvar Solicitação');
        } 
        
		
	}	

});


Template.alimentoItem.events({
	'click .alimento' : function(e) {
		

		if( ! Meteor.Device.isDesktop() ){

			ja_tem= Rascunhos.find( 
			 { $and:[  
				{id_solicitante : Meteor.userId() } ,	
				{id_alimento :e.target.id }
			]}).count();

			if(ja_tem){
				console.log("Ja tem "+e.target.id   );
			}else{	
				
				console.log("add alimento "+e.target.id);
				
 				Rascunhos.insert({				
					id_solicitante : Meteor.userId() ,				
					id_alimento : e.target.id , 
					quantidade: 1 ,
					unidade: Alimentos.findOne({_id : e.target.id}).unidade 
				});
			}	 
		}	 

	}	

});


Template.solicitarOrcamento.rendered = function(){
	this.autorun(function () {
	AlimentosSearch.search("a");	
	}.bind(this));

	

    $(".dieta").on('dragout', function(e) {
		console.log("NA DIETA "+this.id);
	}),
	
	
	$(".dieta").on('drop', function(e) {
  
		if(e.target.id == "dieta-1" ){
			e.preventDefault();
			var dt =  e.originalEvent.dataTransfer;		
			var data = dt.getData("text");
			var sel= document.getElementById(data) ;
			

			console.log("DROP "+data+" ("+sel.textContent+") em "+ e.target.id);
			
	
			
			ja_tem= Rascunhos.find( 
			 { $and:[  
				{id_solicitante : Meteor.userId() } ,	
				{id_alimento :data }
			]}).count();

			if(ja_tem){
				console.log("Ja tem "+data   );
			}else{	
				
				console.log("add alimento "+data);
				
			 Rascunhos.insert({				
				id_solicitante : Meteor.userId() ,				
				id_alimento : data , 
				quantidade: 1 ,
				unidade: Alimentos.findOne({_id : data}).unidade 
			});
			}	

			
		}	

	}),
  
    $(".dieta").on('dragover', function(e) {
		e.preventDefault();
		//	console.log("ondragover ");
	})  
};

Template.alimentoItem.rendered = function(){
	$(".alimento").on('dragstart', function(e) {

		var dt =  e.originalEvent.dataTransfer;
		//dt.effectAllowed = "copyMove";
		dt.setData("text/plain", e.target.id);
		console.log("selecionado"+e.target.id);		
	}),
	$(".alimento").on('dragout', function(e) {
		//alert('dragout');
			// .. 
		// It could be a good idea to add {{_id}} to your template, this way out can call:
		console.log(this.id);
	})
};
Template.dietaItem.events({
	'click .del-alimento' : function(e) {
		console.log("selecionado par del "+e.target.id);
		Rascunhos.remove(e.target.id);
	},
	
	'focusout .qtd_alimento' : function(e) {
		console.log("id "+e.target.id);
		id = e.target.id.replace('qtd_', '');
		console.log("id  de "+e.target.id+' id '+id);
		qtd = document.getElementById(e.target.id).value;
		console.log("qtd "+qtd);
		Rascunhos.update( { _id : id  } ,
		{ $set : { quantidade : qtd }}
		);
	},
	
	'focusout .uni_alimento' : function(e) {
		console.log("id "+e.target.id);
		id = e.target.id.replace('unidade_', '');
		console.log("id  de "+e.target.id+' id '+id);
		uni = document.getElementById(e.target.id).value;
		console.log("uni "+uni);
		Rascunhos.update( { _id : id  } ,
		{ $set : { unidade : uni }}
		);
	}
	
});

	
	


Template.solicitarOrcamento.events({
	"keyup #busca-alimento": _.throttle(function(e) {
		var text = $(e.target).val().trim();
		AlimentosSearch.search(text);
	}, 200),
	'ondragstart .alimento': function(e) {
	   var dt =  e.originalEvent.dataTransfer;
		//dt.effectAllowed = "copyMove";
		dt.setData("text/plain", e.target.id);
		console.log("selecionado"+e.target.id);
		alert("selecionado"+e.target.id);
	},
	'ondrop .alimento': function(e) {
		//alert('ondrop');
		e.preventDefault();
		var data = e.dataTransfer.getData("text");
		e.target.appendChild(document.getElementById(data));
	},
	'ondragover .card': function(e) {
		alert('ondragover');
		e.preventDefault();
	},		
});



 
