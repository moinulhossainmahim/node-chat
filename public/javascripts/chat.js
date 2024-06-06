const socket = io();
socket.on( 'typing', function( data ) {
    const typing = document.getElementById( 'typing' );
    if ( 0 === data.message.trim().length ) {
        typing.classList.add( 'd-none' );
        typing.innerHTML = '';
    } else {
        typing.innerHTML = `${data.name} is typing...`;
        typing.classList.remove( 'd-none' );
    }
} );
socket.on( 'message', function( data ) {
    const typing = document.getElementById( 'typing' );
    const messages = document.getElementById( 'messages' );
    typing.classList.add( 'd-none' );
    typing.innerHTML = '';
    messages.innerHTML = `<li class="list-group-item list-group-item-action flex-column align-items-start"><div class="d-flex w-100 justify-content-between"><h5 class="mb-1">${data.user?data.user.name:''}</h5><small>${moment( data.createdAt ).fromNow()}</small></div><p class="mb-0">${data.message}</p></li>${messages.innerHTML}`;
} );
const message = document.getElementById( 'message' );
message.addEventListener( 'input', ( e ) => {
    socket.emit( 'typing', { user: user.id, name: user.name, message: e.target.value } );
} );
const form = document.getElementById( 'form' );
form.addEventListener( 'submit', ( e ) => {
    e.preventDefault();
    if ( e.target.message.value.trim().length === 0 ) return false;
    socket.emit( 'message', { user: user.id, name: user.name, message: e.target.message.value } );
    message.value = '';
} );
