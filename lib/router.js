Router.configure({
  layoutTemplate: 'layout' ,
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() { 
    return [ //Meteor.subscribe('alimentos')
	//,Meteor.subscribe('listaUsuarios')
	]
  }
});

AlimentosListController = RouteController.extend({	
	increment: 5, 
	sort: {data_cadastro: -1},
	limit: function() { 
		return parseInt(this.params.limit) || this.increment; 
	},
	findOptions: function() {
		return {sort: this.sort};//, limit: this.limit()};
	},
	waitOn: function() {
		return Meteor.subscribe('alimentos', this.findOptions());
	},
	alimentos: function() {
		return Alimentos.find({}, this.findOptions());
	},
	nextPath: function() {
		return Router.routes.alimentos.path({limit: this.limit() + this.increment})
	},
	data: function() {
		var hasMore = this.alimentos().fetch().length === this.limit();
		return {
		  alimentos: this.alimentos(),
		  nextPath: hasMore ? this.nextPath() : null
		};
	  }
});


UsersListController = RouteController.extend({
	waitOn: function() { 
    return [ Meteor.subscribe('listaUsuarios')
	]
	}
	/*,
	 increment: 5, 
  limit: function() { 
    return parseInt(this.params.postsLimit) || this.increment; 
  },
  findOptions: function() {
    return {sort: this.sort, limit: this.limit()};
  },
  waitOn: function() {
    return Meteor.subscribe('listaUsuarios', this.findOptions());
  },
  posts: function() {
    return Posts.find({}, this.findOptions());
  },
  data: function() {
    var hasMore = this.posts().fetch().length === this.limit();
    return {
      posts: this.posts(),
      nextPath: hasMore ? this.nextPath() : null
    };
  }
*/
});

Router.map(function() {
	this.route('barra', {
		path: '/',
		template: 'home',
	});
	this.route('home', {
		path: '/home',
		template: 'home',
	});
	this.route('login', {
		path: '/login',
		template: 'userAccounts',
	});	
	this.route('solicitarOrcamento', {
		path: '/solicitarOrcamento/',
		template: 'solicitarOrcamento',		
		waitOn: function() {
		
		  return [
				Meteor.subscribe('rascunhos', Meteor.userId()),
				Meteor.subscribe('solicitacoesDoComprador', Meteor.userId()),
				Meteor.subscribe('alimentos'),
				Meteor.subscribe('listaUsuarios'),		
			 ];
		}
		
	}),		
	this.route('minhasSolicitacoes', {
		path: '/minhasSolicitacoes/',
		template: 'minhasSolicitacoes',		
		waitOn: function() {
		
		  return [
				Meteor.subscribe('solicitacoesDoComprador', Meteor.userId()),	
				Meteor.subscribe('orcamentosRecebidos', Meteor.userId()),				
			 ];
		}
		
	}),
	this.route('verOrcamentos', {
		path: '/verOrcamentos/:_id',
		template: 'verOrcamentos',		
		waitOn: function() {
		
		  return [
				
				Meteor.subscribe('orcamentosDaSolicitacao', Router.current().params._id),
				Meteor.subscribe('listaUsuarios'),
			 ];
		}
		
	})


	this.route('verItensSolic', {
		path: '/verItensSolic/:_id',
		template: 'verItensSolic',
		waitOn: function() {		
		  return [
				Meteor.subscribe('SolicitacaoItem', Router.current().params._id),
				Meteor.subscribe('alimentos')		
			 ];
		}
	});

	this.route('criarFornecedor', {
		path: '/criarFornecedor',
		template: 'criarFornecedor',
		
	});
	this.route('criarComprador', {
		path: '/criarComprador',
		template: 'criarComprador',
		
	});	

	
	
	this.route('profile', {
		path: '/profile',
		template: 'profile',
		waitOn: function() { 
			return [ Meteor.subscribe("userData")
			]
		}
	});
	this.route('solicitacoes', {
		path: '/solicitacoes',
		template: 'solicitacoes',		
		waitOn: function() {
		
		  return [
				Meteor.subscribe('solicitacoes'),
				Meteor.subscribe('listaUsuarios'),
				Meteor.subscribe('solicitacoesRespondidas', Meteor.userId()),

			 ];
		}
		
	}),

	this.route('fazerOrcamento', {
		path: '/fazerOrcamento/:_id',
		template: 'fazerOrcamento',
		waitOn: function() {		
		  return [
		  		Meteor.subscribe('listaUsuarios'),
				Meteor.subscribe('solicitacao', Router.current().params._id),
				Meteor.subscribe('SolicitacaoItem', Router.current().params._id),
				Meteor.subscribe('alimentos')	
			 ];
		}
	});

	this.route('verOrcamento', {
		path: '/verOrcamento/:_id',
		template: 'verOrcamento',
		waitOn: function() {		
		  return [
				Meteor.subscribe('orcamento', Router.current().params._id),
				Meteor.subscribe('listaUsuarios'),
			 ];
		}
	});







	this.route('alimentos', {
		path: '/alimentos/:limit?',
		template: 'alimentos',
		controller: AlimentosListController
	});


	this.route('dieta', {
		path: '/dieta',
		template: 'dieta',
		waitOn: function() {
		
		  return [
				Meteor.subscribe('userDieta'),	Meteor.subscribe('alimentos')		
			 ];
		}
	});
	
	
	
	
	this.route('pacientes', {
		path: '/pacientes',
		template: 'pacientes',
		controller:  UsersListController
		
	});
	this.route('pacienteNovo', {
		path: '/pacienteNovo',
		template: 'pacienteNovo',
		waitOn: function() { 
		return [ Meteor.subscribe('listaPacientes')
		]
		}
		
	});
	
	this.route('nutricionistas', {
		path: '/nutricionistas',
		template: 'nutricionistas',
		controller: UsersListController
		
	});
	this.route('nutricionistaNovo', {
		path: '/nutricionistaNovo',
		template: 'nutricionistaNovo',
		controller: UsersListController
		
	});
	
	this.route('usuarios', {
		path: '/usuarios',
		template: 'usuarios',
		controller:  UsersListController
		 
	});
	
});	

var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('userAccounts');
    }
  } else {
    this.next();
  }
}

var requireAdmin = function() {

  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
	this.render(this.loadingTemplate);
    } else {
      this.render('userAccounts');
    }
  } else { 
    if (Roles.userIsInRole(Meteor.user(), ['admin'])) {
			this.next();
		}	
		else{
			this.render('accessDenied');
		}
  } 
}

var requireNutri = function() {

  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
	this.render(this.loadingTemplate);
    } else {
      this.render('userAccounts');
    }
  } else { 
    if (Roles.userIsInRole(Meteor.user(), ['nutri','admin'])) {
			this.next();
		}	
		else{
			this.render('accessDenied');
		}
  } 
}

Router.onBeforeAction(requireNutri, {only: ['pacientes']});
Router.onBeforeAction(requireAdmin, {only: ['usuarios']});
Router.onBeforeAction(requireLogin, {except: ['userAccounts','criarFornecedor','criarComprador']});
