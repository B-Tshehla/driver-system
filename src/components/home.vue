<template>
    
    <div class="auth-wrapper-home">
        <div class="auth-inner-home">
          <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
            <symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
            </symbol>
            <symbol id="info-fill" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
            </symbol>
            <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
            </symbol>
          </svg>
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

                      <div>
                        <p>
                          <b>Number Of Students: </b>
                          {{studCount}}</p>
                        </div>
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
                        <b>Departure:</b>
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
                        
                       <div class="alert alert-success d-flex align-items-center" role="alert" v-if="access=='Access Granted'">
                          <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"><use xlink:href="#check-circle-fill"/></svg>
                          <div>
                            {{access}}
                          </div>
                        </div>

                        <div class="alert alert-danger d-flex align-items-center" v-if="access=='Access Denied'" role="alert">
                          <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
                          <div>
                            {{access}}
                          </div>
                        </div>
                        <div>
                          <b-button variant="success" @click="next">Next</b-button>
                        </div>
                    </div>
                </div>
                
            
            
        </div>
    </div>
    
</template>

<script>
import { doc, getDoc,getFirestore,setDoc } from "firebase/firestore";
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
              isStudData:null,
              isfilled:null,
              studCount:null,
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
          this.isfilled=docSnap.data().isfilled;
          this.isStudData=docSnap.data().isStudData;

          if(this.date==this.select.date && this.time==this.select.time 
          && this.depature==this.select.depature && this.destination== this.select.destination){
            this.access="Access Granted";
          }
          else{
             this.access="Access Denied";
          }

          

        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
        },
       async next(){
          
          
          this.isfilled=false;
          
          const db=getFirestore();
         
          if(this.access=="Access Granted"){
            this.studCount=this.studCount-1;
            // Add a new document in collection "Campus"
            await setDoc(doc(db, "Campus", this.select.depature,this.select.destination,this.select.time), {
              studCount:this.studCount,
            });
            await setDoc(doc(db,"students",this.qrText),{
              fname:this.fname,
              lname:this.lname,
              studNum:this.studNum,
              isStudData:this.isStudData,
              isfilled:this.isfilled,
              depature:"",
              destination:"",
              time:"",
              date:"",
            
            });
            this.qrText=null;
          }
          else{
            this.qrText=null;
          }

          
        },
       async selectedData(){
          var today = new Date();
          var dd = today.getDate();
          var mm = today.getMonth()+1; 
          var yyyy = today.getFullYear();

          this.select.date=dd+'/'+mm+'/'+yyyy;
          this.isSelected=true;

          const db=getFirestore();
          const docRef = doc(db, "Campus", this.select.depature,this.select.destination,this.select.time);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
              console.log("Document data:", docSnap.data());
              this.studCount=docSnap.data().studCount;
            } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
            }
          
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
