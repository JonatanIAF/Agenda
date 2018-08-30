import { Component } from '@angular/core';
import { ContactProvider, Contact } from '../../providers/contact/contact';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Camera, CameraOptions} from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';

@IonicPage()
@Component({
  selector: 'page-guardar',
  templateUrl: 'guardar.html',
})
export class GuardarPage {
  model: Contact;
  key: string;
  myFoto:any;
  path: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private contactProvider: ContactProvider, 
    private toast: ToastController, private camera:Camera, private picker:ImagePicker) {
      this.path= "../../assets/imgs/golden-gate.jpg";
    if (this.navParams.data.contact && this.navParams.data.key) {
      this.model = this.navParams.data.contact;
      this.key =  this.navParams.data.key;
    } else {
      this.model = new Contact();
    }
  }
  save() {
    this.saveContact()
      .then(() => {
        this.toast.create({ message: 'Contacto guardado.', duration: 3000, position: 'top' }).present();
        this.navCtrl.pop();
      })
      .catch(() => {
        this.toast.create({ message: 'Error al guardar.', duration: 3000, position: 'top' }).present();
      });
  }
 
  private saveContact() {
    if (this.key) {
      return this.contactProvider.update(this.key, this.model);
    } else {
      return this.contactProvider.insert(this.model);
    }
  }
  choosePicture(){
    let option={
      title: 'Selecciona',
      message: 'Selecciona una imagen',
      maximumImagesCount: 1,
      outType: 0
    };

    this.picker.getPictures(option).then(results=>{
      for(var i=0; i< results.length; i++){
        this.path=results[i];
        alert("Galeria Path: "+ results[i]);
      }
    },err=>{
      alert("Error"+ err);
    })
  }

  takePicture(){
      const options: CameraOptions = {
        quality: 70,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then(imageData=>{
      this.myFoto= 'data:image/jpeg;base64,' + imageData;
    }, (err)=>{
      alert("Error"+ err);
    }) 
  }

  /*tomarFoto(){
    const options: CameraOptions = {
      quality: 80,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     this.myFoto= 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
     // Handle error
    });
  }*/

  /*elegirFoto(){
    const options: CameraOptions = {
      quality: 80,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     this.myFoto= 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
     // Handle error
    });
  }*/

}