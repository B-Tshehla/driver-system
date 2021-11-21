<template>
    
    <div class="auth-wrapper-home">
        <div class="auth-inner-home">
            <h3>home</h3>
                <div v-if="qrText">
                    <h3>{{qrText}}</h3>
                </div>
                <div class="scanner" v-if="!qrText">
                     <qrcode-stream @decode="decode" :track="drawOutline"/>
                </div>
                
            
            
        </div>
    </div>
    
</template>

<script>
import {QrcodeStream} from 'vue-qrcode-reader'
export default {
    name:'home',
    data() {
        return {
            qrText:null
        }
    },
    components:{
        QrcodeStream
    },
    methods:{
        decode(decodeString){
            this.qrText=decodeString;
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
    
           
        }
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

</style>
