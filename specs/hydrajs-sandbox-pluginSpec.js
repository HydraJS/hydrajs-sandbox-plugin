describe( 'Hydra Sandbox', function () {

  it( 'should return a function for action property of Hydra', function () {
    expect( Hydra.action ).toBeDefined();
    expect( typeof Hydra.action ).toEqual( 'function' );
  } );

} );

describe( 'Hydra Action', function () {

  it( 'should return the Action Class', function () {
    var oResult;

    oResult = Hydra.action();

    expect( oResult.type ).toEqual( 'Action' );
  } );

} );

describe( 'Hydra Action Listen', function () {
  var sListener, fpHandler, oModule, oAction;

  beforeEach( function () {
    sListener = 'test';
    fpHandler = sinon.stub();
    oModule = {
      init: function () {},
      handleAction: fpHandler,
      destroy: function () {}
    };
    oAction = new Hydra.action();
    oAction.__restore__();
  } );

  afterEach( function () {
    oAction.__restore__();
  } );

  it( 'should not call fpHandler if notify is launched before set the listeners', function () {
    oAction.notify( [sListener], { type: sListener } );

    expect( fpHandler.callCount ).toEqual( 0 );
  } );

  it( 'should call fpHandler if notify is launched after set the listeners', function () {
    oAction.listen( [sListener], fpHandler, oModule );

    oAction.notify( { type: sListener } );

    expect( fpHandler.callCount ).toEqual( 1 );
  } );

} );

describe( "Hydra action notify", function () {
  var oAction, fpListen, sListener, sOtherListener, nData, oNotifier, oOtherNotifier, fpHandler, oModule, oErrorHandler, oAction;

  beforeEach( function () {
    fpListen = sinon.stub();
    sListener = 'test';
    sOtherListener = 'test2';
    nData = 1;
    oNotifier = {
      type: sListener,
      data: nData
    };
    oOtherNotifier = {
      type: sOtherListener,
      data: nData
    };
    fpHandler = function ( oAction ) {
      if( oAction.type === sListener ) {
        fpListen();
      }
    };
    oModule = {
      init: function () {},
      handleAction: fpHandler,
      destroy: function () {}
    };
    oErrorHandler = Hydra.errorHandler();
    sinon.stub( oErrorHandler, 'log' );
    oAction = Hydra.action();
    oAction.__restore__();
    oAction.listen( [sListener], fpHandler, oModule );
  } );

  afterEach( function () {
    oErrorHandler.log.restore();
    oAction.__restore__();
  } );

  it( 'should not call the fpListen callback if the action called is test2', function () {
    oAction.notify( oOtherNotifier );

    expect( fpListen.callCount ).toEqual( 0 );
  } );

  it( 'should call the fpListen callback if the action called is test', function () {
    oAction.notify( oNotifier );

    expect( fpListen.callCount ).toEqual( 1 );
  } );

  it( 'should not call ErrorHandler.log if debug mode is off', function () {
    oAction.notify( oNotifier );

    expect( oErrorHandler.log.callCount ).toEqual( 0 );
  } );

  it( 'should call ErrorHandler.log one time if debug mode is active', function () {
    var oCall;
    Hydra.setDebug( true );
    oAction.notify( oNotifier );
    oCall = oErrorHandler.log.getCall( 0 );

    expect( oErrorHandler.log.callCount ).toEqual( 1 );
    expect( oNotifier.type ).toEqual( oCall.args[0] );
    expect( oNotifier.type ).toEqual( oCall.args[1].type );
    expect( oCall.args[1].executed.calls ).toEqual( 1 );
    expect( oModule ).toBe( oCall.args[1].executed.actions[0].module );
    expect( fpHandler ).toBe( oCall.args[1].executed.actions[0].handler );
    Hydra.setDebug( false );
  } );

} );

describe( 'Hydra Action Stop Listen', function () {
  var oAction, fpListen, sListener, nData, oNotifier, fpHandler, oModule, oAction;

  beforeEach( function () {
    fpListen = sinon.stub();
    sListener = 'test';
    nData = 1;
    oNotifier = {
      type: sListener,
      data: nData
    };
    fpHandler = function ( oAction ) {
      if( oAction.type === sListener ) {
        fpListen();
      }
    };
    oModule = {
      init: function () {},
      handleAction: fpHandler,
      destroy: function () {}
    };
    oAction = Hydra.action();
    oAction.__restore__();
    oAction.listen( [sListener], fpHandler, oModule );
  } );

  afterEach( function () {
    oAction.__restore__();
  } );

  it( 'should call the fpListen callback if the action called is not stopListen', function () {
    oAction.notify( oNotifier );

    expect( fpListen.callCount ).toEqual( 1 );
  } );

  it( 'should not call the fpListen callback if the action called is test if stopListen is called before', function () {
    oAction.stopListen( [sListener], oModule );

    oAction.notify( oNotifier );

    expect( fpListen.callCount ).toEqual( 0 );
  } );
} );
