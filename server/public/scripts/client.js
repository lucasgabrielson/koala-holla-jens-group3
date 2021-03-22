console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  // Establish Click Listeners
  setupClickListeners()
  // load existing koalas on page load
  getKoalas();

}); // end doc ready

function setupClickListeners() {
  $( '#addButton' ).on( 'click', function(){
    console.log( 'in addButton on click' );
    // get user input and put in an object
    // NOT WORKING YET :(
    // using a test object
    let koalaToSend = {
      name: $('#nameIn').val(),
      age: $('#ageIn').val(),
      gender: $('#genderIn').val(),
      ready_to_transfer: $( '#readyForTransferIn').val(),
      notes: $( '#notesIn').val()
    };
    if( koalaToSend.name === undefined || koalaToSend.age === undefined || koalaToSend.gender === null || koalaToSend.ready_to_transfer === null || koalaToSend.notes === undefined ) {
      swal ( "Oops" ,  "All Fields Must be Defined!" ,  "error" );
      clearInputs();
    }
    else {
      // call saveKoala with the new obejct
      saveKoala( koalaToSend );
    }
  }); 
  $('#viewKoalas').on('click', '.transferKoalaButton', transferKoala);
  $('#viewKoalas').on('click', '.deleteKoalaButton', deleteKoala);
}

function transferKoala(){
  console.log( 'in transferKoala');
  let koalaID = $(this).data('id');
  let koalaTransfer = $( this ).data( 'transfer' );
  $.ajax({
    type: 'PUT',
    url: '/koalas/' + koalaID + koalaTransfer
  }).then(function (response){
    console.log('back from transfer');
    getKoalas();
  }).catch(function (err){
    alert('dead koala on transfer');
    console.log(err)
  })
}

function deleteKoala(){
  console.log( 'in deleteKoala');
  swal({
    title: "Are you sure sure you want to delete the Koala?",
    text: "Did s/he die?",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      swal("The koala has been eliminated!", {
        icon: "success",
      });
      let myID = $( this ).data( 'id' );
      $.ajax({
        method: 'DELETE',
        url: '/koalas/' + myID
      }).then( function( response ){
        console.log( 'back from delete with:', response);
        getKoalas();
      }).catch( function( err ){
        alert( 'error deleting the koala mate!');
        console.log( err );
      })
    } 
    else {
      swal( 'The Koala is Safe!' );
    }
  });
}

function getKoalas(){
  console.log( 'in getKoalas' );
  // ajax call to server to get koalas
  $.ajax({
    method: 'GET',
    url: '/koalas'
  }).then( function( response ){
    console.log( 'back from GET with:', response);
    displayKoalas( response );
  }).catch( function( err ){
    alert( 'error fetching koalas from the server mate!' );
    console.log( err );
  })
} // end getKoalas


function saveKoala( newKoala ){
  console.log( 'in saveKoala', newKoala );
  // ajax call to server to push koala
  $.ajax({
    method: 'POST',
    url: '/koalas',
    data: newKoala
  }).then( function ( response ){
    console.log( 'back from POST with:', response );
    getKoalas();
    clearInputs();
  }).catch( function(err){
    alert( 'error posting koalas mate!' );
    console.log( err );
  })
}//end saveKoala 


function displayKoalas( array ){
  console.log( 'in displayKoalas' );
  $('#viewKoalas').empty();

  for (let i=0; i<array.length; i++){
    let koala = array[i];

    $('#viewKoalas').append(
      `
      <tr>
        <td>${koala.name}</td>
        <td>${koala.age}</td>
        <td>${koala.gender}</td>
        <td>${koala.notes}</td>
        <td>${koala.ready_to_transfer}</td>
        <td><button type="button" data-id=${koala.id} data-transfer=${koala.ready_to_transfer} class="btn btn-secondary" class="transferKoalaButton" >Change Status</button></td>
        <td>
          <button type="button" data-id=${koala.id} class="btn btn-secondary" class="deleteKoalaButton">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
            </svg>
          </button>
        </td>
      <tr> 
      `
    )
  }
}

function clearInputs(){
  $('#nameIn').val('');
  $('#ageIn').val('');
  $('#genderIn').val('');
  $( '#readyForTransferIn').val('');
  $( '#notesIn').val('');
}//end of clearInputs

// on click of transfer button 
// run transfer koala
// send koala.ready_to_transfer as a param to the put route
// check value of param
// run sql query for correct request