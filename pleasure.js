/*************** Introduction ***************/
/*These codes demonstrate how learning or instant joy influence pleasure.*/
/*Only for reference, not accurate.*/
/*author: Yuchu Liu*/

var emitter = require('events').EventEmitter;
var pleasure_log = [];


/*************** functions ***************/

/*simulate when time passes, the pleasure that a person have will decrease.
set the pleasure decreases certain amounts within certain amounts of time.
when the person is killing time, decrease
when the person is learning, decrease the pleasure even if is less than 0.*/
function timePasses () {
	pleasure_log.push(person.pleasure);
	if (person.pleasure>0 || is_learning)
		person.pleasure--;
		
	setTimeout(()=>timePasses(), pleasure_decrease_interval);
}

//killing time will bring a higher instant pleasure
function killingTimeSimulation() {
	person.brain.emit('pleasure', instant_pleasure);
	setTimeout(()=>killingTimeSimulation(), activity_slot);
}

//learn will bring increased pleasure, start with lower pleasure
function learningSimulation(pleasure_value) {
	person.brain.emit('pleasure', pleasure_value);
	if (is_learning)
		setTimeout(()=>learningSimulation(pleasure_value+pleasure_increase), activity_slot);
}

//activity simulation
function activity(recreation_activity) {
	if (recreation_activity === 'killing_time') killingTimeSimulation();
	if (recreation_activity === 'learning') learningSimulation(1);
}



/*************** main ***************/

/*killing time includes any recreation ways providing instant joy:
	playing games, watching short videos or trash movies...
  learning includes any activities would provide long run benefits:
  	reading, exercises, cooking, singing...*/

var choices = ['learning', 'killing_time'];
//select 'learning' use choices[0], select 'killing_time' use choices[1]
var your_choice = choices[0];
var is_learning = your_choice==='learning'? true : false;


/*set a certain amount of time to do the activity,
  set the interval for each decrease of pleasure,
  and the fixed period of time after which the activity will bring pleasure*/
var activity_time = 3000;
var pleasure_decrease_interval = 40;
var activity_slot = 200;
var initial_value = 0;
var instant_pleasure = 4;
var pleasure_increase = 1;


//the brain receives and produces pleasure
//pleasure will accumulate
var person = {pleasure: initial_value, brain: new emitter()};
person.brain.on('pleasure', (pleasure_value) => {
	person.pleasure += pleasure_value;
});


//start the activity
activity(your_choice);
timePasses();


//stop the activity and show the result
process.on('exit', ()=>console.log(pleasure_log));
setTimeout(()=>process.exit(), activity_time);
