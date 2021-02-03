import firebase from './firebaseConnection';

export default class ScoreService
{
    constructor(model, gameKey) {
        this.users = [];
        this.model = model;
        this.gameKey = gameKey;
    }

    async getUsers() {
        await firebase.database().ref('users').once('value').then(snapshot => {
            snapshot.forEach( childItem => {
                this.users.push({ 
                    key: childItem.key, 
                    name: childItem.val().name, 
                    score: childItem.val().score, 
                });
            })
        })
    }

    async getBets() {
        await firebase.database().ref('app').child('bet').once('value').then(snapshot => {
            this.bets = snapshot;
        })
    }

    setModel(model){
        this.model = model;
    }

    async init() {
        await this.getUsers();
        await this.getBets();
    }

    async calculateScore(){

        await this.bets.forEach(bet => {

            let compare = bet.child(this.gameKey);

            if(compare.exists()){
                let goalsHome = compare.child('teamHome/score').val();
                let goalsGuest = compare.child('teamGuest/score').val();

                let exactScore = false;

                if( goalsHome ===  this.model.teamHome.score && goalsGuest ===  this.model.teamGuest.score) {
                   
                   this.users.forEach(user => {
                        if(bet.key === user.key){
                            user.score = user.score + 3;
                        }
                    })

                    exactScore = true;
                } 

                if( !exactScore && goalsHome > goalsGuest && this.model.teamHome.score > this.model.teamGuest.score) {
                   this.users.forEach(user => {
                        if(bet.key === user.key){
                            user.score = user.score + 1;
                        }
                    })
                }

                if( !exactScore && goalsHome < goalsGuest && this.model.teamHome.score < this.model.teamGuest.score) {
                    this.users.forEach(user => {
                         if(bet.key === user.key){
                             user.score = user.score + 1;
                         }
                     })
                 }

                var playersGoalsHomeClone = [ ...this.model.teamHome.goals ];
                var playersGoalsGuestClone = [ ...this.model.teamGuest.goals ];

                compare.child('teamHome/goals').forEach(goal => {
                    let indexWhile = 0;
                    let statusWhile = true;

                    while (statusWhile && playersGoalsHomeClone.length > indexWhile) {
                        if((typeof playersGoalsHomeClone[indexWhile] !== 'undefined') && playersGoalsHomeClone[indexWhile].name === goal.child('name').val()){
                            statusWhile = false;
                            playersGoalsHomeClone = this.arrayRemove(playersGoalsHomeClone, indexWhile);
                            this.users.forEach(user => {
                                if(bet.key === user.key){
                                    user.score = user.score + 0.5;
                                }
                            })
                        } else {
                            indexWhile++;
                        }
                    }
                });

                compare.child('teamGuest/goals').forEach(goal => {
                    let indexWhile = 0;
                    let statusWhile = true;

                    while (statusWhile && playersGoalsGuestClone.length > indexWhile) {
                        if((typeof playersGoalsGuestClone[indexWhile] !== 'undefined') && playersGoalsGuestClone[indexWhile].name === goal.child('name').val()){
                            statusWhile = false;
                            playersGoalsGuestClone = this.arrayRemove(playersGoalsGuestClone, indexWhile);
                            this.users.forEach(user => {
                                if(bet.key === user.key){
                                    user.score = user.score + 0.5;
                                }
                            })
                        } else {
                            indexWhile++;
                        }
                    }
                })
            
            };
        })
    }

    arrayRemove(arr, index) { 
        delete arr[index];

        return arr =  arr.filter((item) =>{ 
            return item && typeof item !== 'undefined'; 
        });
    }

    async save(){
        await this.users.forEach(async user => {
            await firebase.database().ref('users').child(user.key).set(user)
        })
    }
}