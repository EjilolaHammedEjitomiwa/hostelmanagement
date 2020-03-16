
'use strict';
let contractInstance = null;
let client = null;
let contractAddress ="ct_2e5S369bw3oeU4PDCEZXjvc6r9KYQ1nzqmwLLTHRTty3c5LASg";
let contractSource =`
contract HostelManagement =

    record hosteInfo = {
        hostelName:string,
        hostelAddress:string,
        facillities:string,
        price:int,
        publisherName:string
        }

    record state = {
       publisher: map(address, list(hosteInfo)),
       hostelCount: int
        }

    stateful entrypoint init() = {
        publisher = {},
        hostelCount = 0

        }

    stateful entrypoint registerHostel(hostelName':string, hostelAddress':string, facillities':string,price':int,publisherName':string,totalAvailableHostel':string) =
        let hostelCounts =getHostelCount() + 1
    
        let availableHostelsDetails = Map.lookup_default(Call.caller, state.publisher,[])

        let newHostel ={hostelName = hostelName', hostelAddress = hostelAddress', facillities = facillities', price = price', publisherName = publisherName'}
        
        let addNewHostel = newHostel::availableHostelsDetails
       
        put(state{publisher[Call.caller] = addNewHostel, hostelCount = hostelCounts})

    entrypoint getAvailableHostel()=

        Map.lookup_default(Call.caller,state.publisher,[]) 

    entrypoint getHostelCount() =
      state.hostelCount

`;
window.addEventListener('load', async function(){
client = await Ae.Aepp();
contractInstance = await client.getContractInstance(contractSource,{contractAddress});

let allHostel= (await contractInstance.methods.getAvailableHostel()).decodedResult;
 console.log(allHostel,"all hostels");
 allHostel.map(hostel=>{
    addHostelToDom(hostel.hostelName,hostel.hostelAddress,hostel.facillities,hostel.price,hostel.publisherName,hostel.totalHostel);
 });
document.getElementById("hostel_loader").style.display = "none";


})

 async function handleSubmitHostel(){
    let hostelname = document.getElementById("input_hostelName").value;
    let hosteladdress = document.getElementById("input_hostelAddress").value;
    let facillities = document.getElementById("input_hosteFacillities").value;
    let price = document.getElementById("input_hostelPrice").value;
    let publishername = document.getElementById("input_publisherName").value;
    let totalHostel = "0";

   if(hostelname.trim() != "",hosteladdress.trim() != "", facillities.trim() != "", price.trim() !="",publishername.trim() != "", totalHostel.trim() != ""){
    document.getElementById("hostel_loader").style.display = "block";   
    await contractInstance.methods.registerHostel(hostelname,hosteladdress,facillities,price,publishername,totalHostel)
   addHostelToDom(hostelname,hosteladdress,facillities,price,publishername,totalHostel)
    document.getElementById("hostel_loader").style.display = "none";   
}
    
}

document.getElementById("submit_hostel").addEventListener("click", handleSubmitHostel);

function addHostelToDom(hostelname,hostelAddress,facillities,price,publishername){
let allHostel = document.getElementById("list-of-hostels");
let newHostelDiv = document.createElement("div");
newHostelDiv.classList.add("hostels");

let hostelTitle = document.createElement("h2")
hostelTitle.innerText = hostelname

let hosteladdress = document.createElement("p")
hosteladdress.innerText = hostelAddress

let facillity = document.createElement("p")
facillity.innerText = facillities

let hostelPrice = document.createElement("p")
hostelPrice.innerText = price

let publisher = document.createElement("p")
publisher.innerText = publishername

newHostelDiv.appendChild(hostelTitle)
newHostelDiv.appendChild(hosteladdress)
newHostelDiv.appendChild(facillity)
newHostelDiv.appendChild(hostelPrice)
newHostelDiv.appendChild(publisher)

allHostel.appendChild(newHostelDiv)
}


(function ($) {

    /*------------------
        Preloader
    --------------------*/
    $(window).on('load', function () {
        $(".loader").fadeOut();
        $("#preloder").delay(200).fadeOut("slow");
    });

    /*------------------
        Background Set
    --------------------*/
    $('.set-bg').each(function () {
        var bg = $(this).data('setbg');
        $(this).css('background-image', 'url(' + bg + ')');
    });

    //Offcanvas Menu
    $(".canvas-open").on('click', function () {
        $(".offcanvas-menu-wrapper").addClass("show-offcanvas-menu-wrapper");
        $(".offcanvas-menu-overlay").addClass("active");
    });

    $(".canvas-close, .offcanvas-menu-overlay").on('click', function () {
        $(".offcanvas-menu-wrapper").removeClass("show-offcanvas-menu-wrapper");
        $(".offcanvas-menu-overlay").removeClass("active");
    });

    // Search model
    $('.search-switch').on('click', function () {
        $('.search-model').fadeIn(400);
    });

    $('.search-close-switch').on('click', function () {
        $('.search-model').fadeOut(400, function () {
            $('#search-input').val('');
        });
    });

    /*------------------
		Navigation
	--------------------*/
    $(".mobile-menu").slicknav({
        prependTo: '#mobile-menu-wrap',
        allowParentLinks: true
    });

    /*------------------
        Hero Slider
    --------------------*/
   $(".hero-slider").owlCarousel({
        loop: true,
        margin: 0,
        items: 1,
        dots: true,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true,
        mouseDrag: false
    });

    /*------------------------
		Testimonial Slider
    ----------------------- */
    $(".testimonial-slider").owlCarousel({
        items: 1,
        dots: false,
        autoplay: true,
        loop: true,
        smartSpeed: 1200,
        nav: true,
        navText: ["<i class='arrow_left'></i>", "<i class='arrow_right'></i>"]
    });

    /*------------------
        Magnific Popup
    --------------------*/
    $('.video-popup').magnificPopup({
        type: 'iframe'
    });

    /*------------------
		Date Picker
	--------------------*/
    $(".date-input").datepicker({
        minDate: 0,
        dateFormat: 'dd MM, yy'
    });

    /*------------------
		Nice Select
	--------------------*/
    $("select").niceSelect();

})(jQuery);