Solicitacoes = new Meteor.Collection('solicitacoes');
SolicitacaoItem = new Meteor.Collection('solicitacaoItem');
Rascunhos = new Meteor.Collection('rascunhos');
Orcamentos = new Meteor.Collection('orcamentos');
Alimentos = new Meteor.Collection('alimentos');
Alimentos.attachSchema(new SimpleSchema({
  descricao: {
    type: String,
    label: "Alimento",
    max: 200
  },
  unidade: {
    type: String,
	label: "Unidade",
    max: 20,
	optional: true    
   },  
  data_cadastro: {
    type: String,
	optional: true    
   }  
}));


