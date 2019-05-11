pragma solidity ^0.5.1;

 
contract CommCar  {
 
    // cust has a token balance which is purchased from Commcar, this is therefore
    // a hybrid model. 
    // a fully decentralised solution will have a normal token ECR20 functions
    // for using on travel but this will need private keys to be held on the phone.
    struct cust_detail {
       uint account_balance;
    }
   
    struct journey {
       uint start_longitude;
       uint start_latitude;
       uint end_longitude;
       uint end_latitude;
       uint start_time;
       uint end_time;
       uint journey_cost;
    }
  
    mapping(address => journey) public journeys;
    mapping(address => cust_detail) public cust_details;
    journey[] old_journeys;
    
    function showCustDetails (address cust) view public returns (uint) {
        return cust_details[cust].account_balance;
    }
    
    function addTokens(address cust, uint _tokenvalue) public {
        // this is demo only
        // of course anyone could just add their own balance here,
        // a real app needs internal and isOwner
        cust_details[cust].account_balance+=_tokenvalue;
    }
    
    
    function startjourney(uint _start_longitude,
    uint _start_latitude, uint _start_time, address cust
        )   public {
            
        journeys[cust].start_longitude=_start_longitude;
        journeys[cust].start_latitude=_start_latitude;
        journeys[cust].end_longitude=_start_longitude; // default
        journeys[cust].end_latitude=_start_latitude; // default
        
        journeys[cust].start_time=_start_time;
        journeys[cust].end_time=_start_time;  // default
        
        journeys[cust].journey_cost=0;  // default
    }
    
    function endjourney(uint _end_longitude,
        uint _end_latitude, uint _end_time, address cust
        )   public {
            

        journeys[cust].end_longitude=_end_longitude; // default
        journeys[cust].end_latitude=_end_latitude; // default
        journeys[cust].end_time=_end_time;  // default
        
   
    }
    
    function calcCost ( address cust
        ) public returns (uint) {
         // full app needs a formula working out the costs. 
         // demo has fixed cost of 10 
         
         journeys[cust].journey_cost=10; // demo only
         
         
         
    } 
    
    function saveJourney(address cust) public {
        // create a history of the journey
        old_journeys.push(journeys[cust]);
    }
    
  
}

   
