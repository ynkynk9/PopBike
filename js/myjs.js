$(document).ready(function(){
  //show img when clicked
   $('#gallery li img').on('click',function(){
        var src = $(this).attr('src');
        var img = '<img src="' + src + '" class="img-responsive"/>';
  //add pre and next button      
        var index = $(this).parent('li').index();                   
        var html = '';
        html += img;                
        html += '<div style="height:25px;clear:both;display:block;">';
        html += '<a class="controls next" href="'+ (index+2) + '">next &raquo;</a>';
        html += '<a class="controls previous" href="' + (index) + '">&laquo; prev</a>';
        html += '</div>';

        $('#myModal').modal();
        $('#myModal').on('shown.bs.modal', function(){
            $('#myModal .modal-body').html(html);
            $('a.controls').trigger('click');
        });
        $('#myModal').on('hidden.bs.modal', function(){
            $('#myModal .modal-body').html('');
        });
   });  
})

 $(document).on('click', 'a.controls', function(){
          // Replace the current image
          
          var index = $(this).attr('href');
          var src = $('.row ul li:nth-child('+ index +') img').attr('src');        

          $('.modal-body img').attr('src', src); 
          console.log(src); 
          //Increment or Decrement the Link Counters
          var newPrevIndex = parseInt(index) - 1; 
          var newNextIndex = parseInt(newPrevIndex) + 2; 
           
          if($(this).hasClass('previous')){               
              $(this).attr('href', newPrevIndex); 
              $('a.next').attr('href', newNextIndex);
          }else{
              $(this).attr('href', newNextIndex); 
              $('a.previous').attr('href', newPrevIndex);
          }
          //Hide links when last or first image is reached
          var total = $('.row ul li').length + 1; 
          //hide next button
          if(total === newNextIndex){
              $('a.next').hide();
          }else{
              $('a.next').show()
          }            
          //hide previous button
          if(newPrevIndex === 0){
              $('a.previous').hide();
          }else{
              $('a.previous').show()
          }         

          return false;         
});


/*smooth scroll*/
$('a').click(function(){
    $('html, body').animate({
        scrollTop: $( $(this).attr('href') ).offset().top
    }, 1000);
    return false;
});