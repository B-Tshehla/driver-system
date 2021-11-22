<template>
    
    <div class="auth-wrapper-home">
        <div class="auth-inner-home">
            <h3>home</h3>
               
                <div v-if="!isSelected">
                  <form >
                    <div class="form-group">
                      <label for="exampleFormControlSelect1">Location of Departure:</label>
                      <select class="form-control" v-model="select.depature" >
                      <option value="" disabled selected>Select your option</option>
                      <option v-for="Campus in Campuses" :key="Campus">{{Campus}}</option>
                      </select>
                    </div>
                    
                    <div class="form-group">
                      <label for="exampleFormControlSelect1">Destination:</label>
                      <select class="form-control" v-model="select.destination">
                      <option value="" disabled selected>Select your option</option>
                      <option v-for="Campus in Campuses" :key="Campus">{{Campus}}</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label for="exampleFormControlSelect1">Time of depature:</label>
                      <select class="form-control" v-model="select.time" >
                      <option value="" disabled selected>Select your option</option>
                      <option v-for="time in times" :key="time">{{time}}</option>
                      </select>
                    </div>

                    <div class="dataButton">
                      <b-button variant="success" @click="selectedData">Next</b-button>
                    </div>

                  </form>
                </div>


               <div v-if="isSelected">
                  <div class="scanner" v-if="!qrText">
                      <qrcode-stream @decode="decode" :track="drawOutline"/>
                  </div>
                  <div v-if="qrText">
                      <p>
                        <b>Name:</b>
                        {{fname}}</p>
                      <p>
                        <b>Surname:</b>
                        {{lname}}</p>
                      <p>
                        <b>Studen Number:</b>
                        {{studNum}}</p>

                      <p>
                        <b>Depature:</b>
                        {{depature}}</p>
                      <p>
                        <b>Destination: </b>
                        {{destination}}</p>
                      <p>
                        <b>Time: </b>
                        {{time}}</p>
                      <p>
                        <b>Date: </b>
                        {{date}}</p>
                        
                        <p>
                          <b>
                            {{access}}
                          </b>
                          </p>
                        <div>
                          <b-button variant="success" @click="next">Next</b-button>
                        </div>
                    </div>
                </div>
                
            
            
        </div>
    </div>
    
</template>

<script>
import { doc, getDoc,getFirestore } from "firebase/firestore";
import {QrcodeStream} from 'vue-qrcode-reader'
export default {
    name:'home',
    data() {
        return {
            qrText:null,
            isSelected:false,
             select:{
                depature:null,
                destination:null,
                time:null,
                date:null,
              },
              Campuses:['Arcadia','Ga-Rankua','Pretoria(Main)','Soshanguve(North)','Soshanguve(South)'],
              times:["07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00",
              "15:00","16:00","17:00","18:00","19:00","20:00","21:00"],
              depature:null,
              destination:null,
              time:null,
              date:null,
              studNum:null,
              fname:null,
              lname:null,
              access:null,
        }
    },
    components:{
        QrcodeStream
    },
    methods:{
        decode(decodeString){
            this.qrText=decodeString;
            this.getStudentData();
        },
        drawOutline(detectedCodes,ctx){
            
            
         for (const detectedCode of detectedCodes) {
        const [ firstPoint, ...otherPoints ] = detectedCode.cornerPoints
        ctx.line
        ctx.strokeStyle = "#007bff";

        ctx.lineWidth = 2;
        ctx.moveTo(firstPoint.x, firstPoint.y);
        for (const { x, y } of otherPoints) {
          ctx.lineTo(x, y);
        }
        ctx.lineTo(firstPoint.x, firstPoint.y);
        ctx.closePath();
        ctx.stroke();
      }
         
      },
      
      async getStudentData(){

        const db=getFirestore();
        const docRef = doc(db, "students", this.qrText);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          this.depature=docSnap.data().depature;
          this.destination=docSnap.data().destination;
          this.time=docSnap.data().time;
          this.date=docSnap.data().date;
          this.lname=docSnap.data().lname;
          this.fname=docSnap.data().fname;
          this.studNum=docSnap.data().studNum;

          if(this.date==this.select.date){
            this.access="Granted";
          }
          else{
             this.access="Denied";
          }

          

        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
        },
        next(){
          this.qrText=null;
        },
        selectedData(){
          var today = new Date();
          var dd = today.getDate();
          var mm = today.getMonth()+1; 
          var yyyy = today.getFullYear();

          this.select.date=dd+'/'+mm+'/'+yyyy;
          this.isSelected=true;
          
          console.log(this.select.depature);
          console.log(this.select.destination);
          console.log(this.select.time);
          console.log(this.select.date);
        },

    }
}
</script>
<style>

  *{
      box-sizing: border-box;
    }

  body{
    /*background: #0f4374 !important;*/
    background-image: url("..//assets//background.jpg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    min-height: 100vh;
    display: flex;
    font-weight: 400;
    font-family: 'Fira Sans',sans-serif;
    text-align: center;
  }

  h1,h2,h3,h4,h5,h6, label,span{
    font-weight: 500;
    font-family: 'Fira Sans',sans-serif;
  }

  body,html,#app,#root,.auth-wrapper-home{
    width: 100%;
    height: 100%;
  }



.auth-wrapper-home{
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: left;
}
.auth-inner-home{
  width:1200px;
  max-width: 100%;
  margin: auto;
  background-color: #ffffff;
  box-shadow: 0px 14px 80px rgba( 34 ,35,58,0.2); 
  padding: 40px 100px 45px 55px;
  border-radius: 0;
  transition: all .3s;
}

.auth-wrapper-home .form-control:focus{
  border-color: #167bff;
  box-shadow: none;
}

.auth-wrapper-home h3{
  text-align: center;
  margin: 0;
  line-height: 1;
  padding-bottom: 20px;
}
.qr-space{
    padding-top: 20px;
    padding-bottom: 20px;
    
    justify-content: center;
}
.user-form{
    padding-bottom: 20px;
}
.scanner{
    width: 400px;
    height: 400px;
    margin: auto;
}

.dataButton{
  padding-top: 20px;
  }
</style>
