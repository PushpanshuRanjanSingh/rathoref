$(document).ready(function(){
    
    $(document).on('click','.login-btn-cus',function () {

        $('.right-login').addClass('show-right-login');
        $('.fade-cus-shadow').addClass('fcs-show');
    });
  
    $(document).on('click','.hbSUw',function () {
        $('.right-login').removeClass('show-right-login');
        $('.fade-cus-shadow').removeClass('fcs-show');
    });
  
    $(document).on('click','.con-cus-btn',function () {
        $('.right-login').removeClass('show-right-login');
        $('.fade-cus-shadow').removeClass('fcs-show');
    });

  });

  
