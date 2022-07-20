(function(){
  /*--- testing log ---*/
  console.log('I am alive!');

  function parse_link_header(header) {
    if (header.length === 0) {
        throw new Error("input must not be of zero length");
    }

    // Split parts by comma
    var parts = header.split(',');
    var links = {};
    // Parse each part into a named link
    for(var i=0; i<parts.length; i++) {
        var section = parts[i].split(';');
        if (section.length !== 2) {
            throw new Error("section could not be split on ';'");
        }
        var url = section[0].replace(/<(.*)>/, '$1').trim();
        var name = section[1].replace(/rel="(.*)"/, '$1').trim();
        links[name] = url;
    }
    return links;
}

  /*--- XHR request response ---*/
  var homeResponse = null;
  var homeData = new XMLHttpRequest();
  // https://api.dribbble.com/v2/popular_shots/?timeframe=week&
  var req = 'https://api.dribbble.com/v2/users/Next-Design/shots?page=1&per_page=100&access_token=073f3da0ac09cec19238e2609fb28d52c2ef369c76ee8a9138857947cbca6fcc';
  homeData.open('GET', req, true);

  //var preloader = document.getElementById('data-loader');
  homeData.onreadystatechange = function() {
    if(homeData.readyState === 4 && homeData.status === 200) {
      homeResponse = homeData.responseText;
      homeResponse = JSON.parse(homeResponse);
      var resHeader = homeData.getResponseHeader("Link");
      //console.log(parse_link_header(resHeader));
      console.log(homeResponse);
      init();
    }
  }

  homeData.send();
  // homeData.onload = function() {
    
  // }

  function init() {

    function Card(props) {
      const numbers = props.shots;
      const shotsList = numbers.map((shots) =>
        <div className="card" key={shots.id}>
          <div className="card__header">
            <img className="card__img" width="400" height="300" src={shots.images.normal}/>
          </div>
          <div className="card__content">
            <p className="card__desc">{shots.user.name}'s</p>
            <h2 className="card__heading">{shots.title}</h2>
          </div>
        </div>
      );
      return (
          <div>{shotsList}</div>
      );

    }

    ReactDOM.render(
      <Card shots={homeResponse}/>,
      document.getElementById('content')
    );
  }
  



  

})();





// (function(){

//   var CardData = null;
//   var homeData = new XMLHttpRequest();
//   homeData.open('GET', 'https://api.dribbble.com/v1/users/Next-Design/shots?page=1&per_page=100&access_token=84b7c40b743ac54e9b5192e0b2e3cef70f2e6dee896ea3e628c28ddf09ac3ac3', true);

//   //var preloader = document.getElementById('data-loader');
// //console.log(homeData);

//   homeData.onreadystatechange = function() {
//     if(homeData.readyState === 4 && homeData.status === 200) {
//       console.log(homeData);
//       //var response = JSON.parse(homeData.response);
//       //console.log(response);
//       //CardData = response.map(function(shots));
//       //console.log(CardData);
//     }
//   }

//   // function Card(props) {
//   //   return (
//   //     <div className="card">
//   //       <div className="card__header">
//   //         <DealImage image={props.image}/>
//   //       </div>
//   //       <div className="card__content">
//   //         <DealTitle heading={props.heading}/>
//   //         <DealDesc description={props.desc}/>
//   //       </div>
//   //     </div>
//   //   )
//   // }

//   // ReactDOM.render(
//   //   //<Card image={cardData.imgUrl} heading={cardData.heading} desc={cardData.description}/>,
//   //   <Card shots={CardData}/>,
//   //   document.getElementById('content')
//   // );

//   // function DealImage(props) {
//   //   return <img className="card__img" src={props.image}/>;
//   // };

//   // function DealTitle(props) {
//   //   return <h2 className="card__heading">{props.heading}</h2>;
//   // }

//   // function DealDesc(props) {
//   //   return <p className="card__desc">{props.description}</p>;
//   // }

//   // function Card(props) {
//   //   return (
//   //     <div className="card">
//   //       <div className="card__header">
//   //         <DealImage image={props.image}/>
//   //       </div>
//   //       <div className="card__content">
//   //         <DealTitle heading={props.heading}/>
//   //         <DealDesc description={props.desc}/>
//   //       </div>
//   //     </div>
//   //   )
//   // }

  


// });


