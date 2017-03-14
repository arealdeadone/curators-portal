import {Component, OnInit, ViewChild, AfterViewInit, OnChanges} from '@angular/core';
import * as firebase from 'firebase';
import {AuthService} from "../../shared/auth.service";
import {FormControl} from "@angular/forms";
import 'rxjs/add/operator/startWith';
import {DomSanitizer} from "@angular/platform-browser";
import {CollectionFormService} from "./collection-form.service";
import {Router} from "@angular/router";
import {Curation} from "../../shared/curation";

declare var CryptoJS;
declare var swal;
@Component({
  selector: 'cp-curation-details',
  templateUrl: './curation-details.component.html',
  styles: [`
sup{
    font-size: 1.5em;
  }
`]
})
export class CurationDetailsComponent implements OnInit{
  @ViewChild('collectionTitle') collectionTitle;
  filePath:any;
  file:any;
  progress:any;
  fileLocalRef:any;
  fileUrl:any;
  currentUser:any;
  cities : Array<any> = [
    'Mumbai','New Delhi','Bengaluru','Ahmedabad','Hyderabad','Chennai','Kolkata','Pune','Jaipur','Surat',
    'Lucknow','Kanpur','Nagpur','Patna','Indore','Thane','Bhopal','Visakhapatnam','Vadodara','Firozabad',
    'Ludhiana','Rajkot','Agra','Siliguri','Nashik','Faridabad','Patiala','Meerut','Kalyan-Dombivali','Vasai-Virar',
    'Varanasi','Srinagar','Dhanbad','Jodhpur','Amritsar','Raipur','Allahabad','Coimbatore','Jabalpur','Gwalior',
    'Vijayawada','Madurai','Guwahati','Chandigarh','Hubli-Dharwad','Amroha','Moradabad','Gurgaon','Aligarh','Solapur',
    'Ranchi','Jalandhar','Tiruchirappalli','Bhubaneswar','Salem','Warangal','Mira-Bhayandar','Thiruvananthapuram',
    'Bhiwandi','Saharanpur','Guntur','Amravati','Bikaner','Noida','Jamshedpur','Bhilai Nagar','Cuttack','Kochi',
    'Udaipur','Bhavnagar','Dehradun','Asansol','Nanded-Waghala','Ajmer','Jamnagar','Ujjain','Sangli','Loni','Jhansi',
    'Pondicherry','Nellore','Jammu','Belagavi','Raurkela','Mangaluru','Tirunelveli','Malegaon','Gaya','Tiruppur',
    'Davanagere','Kozhikode','Akola','Kurnool','Bokaro Steel City','Rajahmundry','Ballari','Agartala','Bhagalpur',
    'Latur','Dhule','Korba','Bhilwara','Brahmapur','Mysore','Muzaffarpur','Ahmednagar','Kollam','Raghunathganj',
    'Bilaspur','Shahjahanpur','Thrissur','Alwar','Kakinada','Nizamabad','Sagar','Tumkur','Hisar','Rohtak','Panipat',
    'Darbhanga','Kharagpur','Aizawl','Ichalkaranji','Tirupati','Karnal','Bathinda','Rampur','Shivamogga','Ratlam',
    'Modinagar','Durg','Shillong','Imphal','Hapur','Ranipet','Anantapur','Arrah','Karimnagar','Parbhani','Etawah',
    'Bharatpur','Begusarai','New Delhi','Chhapra','Kadapa','Ramagundam','Pali','Satna','Vizianagaram','Katihar',
    'Hardwar','Sonipat','Nagercoil','Thanjavur','Murwara (Katni)','Naihati','Sambhal','Nadiad','Yamunanagar',
    'English Bazar','Eluru','Munger','Panchkula','Raayachuru','Panvel','Deoghar','Ongole','Nandyal','Morena','Bhiwani',
    'Porbandar','Palakkad','Anand','Purnia','Baharampur','Barmer','Morvi','Orai','Bahraich','Sikar','Vellore',
    'Singrauli','Khammam','Mahesana','Silchar','Sambalpur','Rewa','Unnao','Hugli-Chinsurah','Raiganj','Phusro',
    'Adityapur','Alappuzha','Bahadurgarh','Machilipatnam','Rae Bareli','Jalpaiguri','Bharuch','Pathankot','Hoshiarpur',
    'Baramula','Adoni','Jind','Tonk','Tenali','Kancheepuram','Vapi','Sirsa','Navsari','Mahbubnagar','Puri',
    'Robertson Pet','Erode','Batala','Haldwani-cum-Kathgodam','Vidisha','Saharsa','Thanesar','Chittoor','Veraval',
    'Lakhimpur','Sitapur','Hindupur','Santipur','Balurghat','Ganjbasoda','Moga','Proddatur','Srinagar','Medinipur',
    'Habra','Sasaram','Hajipur','Bhuj','Shivpuri','Ranaghat','Shimla','Tiruvannamalai','Kaithal','Rajnandgaon','Godhra',
    'Hazaribag','Bhimavaram','Mandsaur','Dibrugarh','Kolar','Bankura','Mandya','Dehri-on-Sone','Madanapalle',
    'Malerkotla','Lalitpur','Bettiah','Pollachi','Khanna','Neemuch','Palwal','Palanpur','Guntakal','Nabadwip','Udupi',
    'Jagdalpur','Motihari','Pilibhit','Dimapur','Mohali','Sadulpur','Rajapalayam','Dharmavaram','Kashipur','Sivakasi',
    'Darjiling','Chikkamagaluru','Gudivada','Baleshwar Town','Mancherial','Srikakulam','Adilabad','Yavatmal','Barnala',
    'Nagaon','Narasaraopet','Raigarh','Roorkee','Valsad','Ambikapur','Giridih','Chandausi','Purulia','Patan','Bagaha',
    'Hardoi ','Achalpur','Osmanabad','Deesa','Nandurbar','Azamgarh','Ramgarh','Firozpur','Baripada Town','Karwar',
    'Siwan','Rajampet','Pudukkottai','Anantnag','Tadpatri','Satara','Bhadrak','Kishanganj','Suryapet','Wardha',
    'Ranebennuru','Amreli','Neyveli (TS)','Jamalpur','Marmagao','Udgir','Tadepalligudem','Nagapattinam','Buxar',
    'Aurangabad','Jehanabad','Phagwara','Khair','Sawai Madhopur','Kapurthala','Chilakaluripet','Aurangabad',
    'Malappuram','Rewari','Nagaur','Sultanpur','Nagda','Port Blair','Lakhisarai','Panaji','Tinsukia','Itarsi','Kohima',
    'Balangir','Nawada','Jharsuguda','Jagtial','Viluppuram','Amalner','Zirakpur','Tanda','Tiruchengode','Nagina',
    'Yemmiganur','Vaniyambadi','Sarni','Theni Allinagaram','Margao','Akot','Sehore','Mhow Cantonment','Kot Kapura',
    'Makrana','Pandharpur','Miryalaguda','Shamli','Seoni','Ranibennur','Kadiri','Shrirampur','Rudrapur','Parli',
    'Najibabad','Nirmal','Udhagamandalam','Shikohabad','Jhumri Tilaiya','Aruppukkottai','Ponnani','Jamui','Sitamarhi',
    'Chirala','Anjar','Karaikal','Hansi','Anakapalle','Mahasamund','Faridkot','Saunda','Dhoraji','Paramakudi',
    'Balaghat','Sujangarh','Khambhat','Muktsar','Rajpura','Kavali','Dhamtari','Ashok Nagar','Sardarshahar','Mahuva',
    'Bargarh','Kamareddy','Sahibganj','Kothagudem','Ramanagaram','Gokak','Tikamgarh','Araria','Rishikesh','Shahdol',
    'Medininagar (Daltonganj)','Arakkonam','Washim','Sangrur','Bodhan','Fazilka','Palacole','Keshod','Sullurpeta',
    'Wadhwan','Gurdaspur','Vatakara','Tura','Narnaul','Kharar','Yadgir','Ambejogai','Ankleshwar','Savarkundla',
    'Paradip','Virudhachalam','Kanhangad','Kadi','Srivilliputhur','Gobindgarh','Tindivanam','Mansa','Taliparamba',
    'Manmad','Tanuku','Rayachoti','Virudhunagar','Koyilandy','Jorhat','Karur','Valparai','Srikalahasti','Neyyattinkara',
    'Bapatla','Fatehabad','Malout','Sankarankovil','Tenkasi','Ratnagiri','Rabkavi Banhatti','Sikandrabad','Chaibasa',
    'Chirmiri','Palwancha','Bhawanipatna','Kayamkulam','Pithampur','Nabha','Shahabad, Hardoi','Dhenkanal',
    'Uran Islampur','Gopalganj','Bongaigaon City','Palani','Pusad','Sopore','Pilkhuwa','Tarn Taran','Renukoot',
    'Mandamarri','Shahabad','Barbil','Koratla','Madhubani','Arambagh','Gohana','Ladnu','Pattukkottai','Sirsi',
    'Sircilla','Tamluk','Jagraon','AlipurdUrban Agglomerationr','Alirajpur','Tandur','Naidupet','Tirupathur',
    'Tohana','Ratangarh','Dhubri','Masaurhi','Visnagar','Vrindavan','Nokha','Nagari','Narwana','Ramanathapuram',
    'Ujhani','Samastipur','Laharpur','Sangamner','Nimbahera','Siddipet','Suri','Diphu','Jhargram','Shirpur-Warwade',
    'Tilhar','Sindhnur','Udumalaipettai','Malkapur','Wanaparthy','Gudur','Kendujhar','Mandla','Mandi','Nedumangad',
    'North Lakhimpur','Vinukonda','Tiptur','Gobichettipalayam','Sunabeda','Wani','Upleta','Narasapuram','Nuzvid',
    'Tezpur','Una','Markapur','Sheopur','Thiruvarur','Sidhpur','Sahaswan','Suratgarh','Shajapur','Rayagada','Lonavla',
    'Ponnur','Kagaznagar','Gadwal','Bhatapara','Kandukur','Sangareddy','Unjha','Lunglei','Karimganj','Kannur','Bobbili',
    'Mokameh','Talegaon Dabhade','Anjangaon','Mangrol','Sunam','Gangarampur','Thiruvallur','Tirur','Rath','Jatani',
    'Viramgam','Rajsamand','Yanam','Kottayam','Panruti','Dhuri','Namakkal','Kasaragod','Modasa','Rayadurg','Supaul',
    'Kunnamkulam','Umred','Bellampalle','Sibsagar','Mandi Dabwali','Ottappalam','Dumraon','Samalkot','Jaggaiahpet',
    'Goalpara','Tuni','Lachhmangarh','Bhongir','Amalapuram','Firozpur Cantt.','Vikarabad','Thiruvalla','Sherkot',
    'Palghar','Shegaon','Jangaon','Bheemunipatnam','Panna','Thodupuzha','KathUrban Agglomeration','Palitana','Arwal',
    'Venkatagiri','Kalpi','Rajgarh (Churu)','Sattenapalle','Arsikere','Ozar','Thirumangalam','Petlad','Nasirabad',
    'Phaltan','Rampurhat','Nanjangud','Forbesganj','Tundla','BhabUrban Agglomeration','Sagara','Pithapuram','Sira',
    'Bhadrachalam','Charkhi Dadri','Chatra','Palasa Kasibugga','Nohar','Yevla','Sirhind Fatehgarh Sahib','Bhainsa',
    'Parvathipuram','Shahade','Chalakudy','Narkatiaganj','Kapadvanj','Macherla','Raghogarh-Vijaypur','Rupnagar',
    'Naugachhia','Sendhwa','Byasanagar','Sandila','Gooty','Salur','Nanpara','Sardhana','Vita','Gumia','Puttur',
    'Jalandhar Cantt.','Nehtaur','Changanassery','Mandapeta','Dumka','Seohara','Umarkhed','Madhupur',
    'Vikramasingapuram','Punalur','Kendrapara','Sihor','Nellikuppam','Samana','Warora','Nilambur','Rasipuram',
    'Ramnagar','Jammalamadugu','Nawanshahr','Thoubal','Athni','Cherthala','Sidhi','Farooqnagar','Peddapuram',
    'Chirkunda','Pachora','Madhepura','Pithoragarh','Tumsar','Phalodi','Tiruttani','Rampura Phul','Perinthalmanna',
    'Padrauna','Pipariya','Dalli-Rajhara','Punganur','Mattannur','Mathura','Thakurdwara','Nandivaram-Guduvancheri',
    'Mulbagal','Manjlegaon','Wankaner','Sillod','Nidadavole','Surapura','Rajagangapur','Sheikhpura','Parlakhemundi',
    'Kalimpong','Siruguppa','Arvi','Limbdi','Barpeta','Manglaur','Repalle','Mudhol','Shujalpur','Mandvi','Thangadh',
    'Sironj','Nandura','Shoranur','Nathdwara','Periyakulam','Sultanganj','Medak','Narayanpet','Raxaul Bazar','Rajauri',
    'Pernampattu','Nainital','Ramachandrapuram','Vaijapur','Nangal','Sidlaghatta','Punch','Pandhurna','Wadgaon Road',
    'Talcher','Varkala','Pilani','Nowgong','Naila Janjgir','Mapusa','Vellakoil','Merta City','Sivaganga','Mandideep',
    'Sailu','Vyara','Kovvur','Vadalur','Nawabganj','Padra','Sainthia','Siana','Shahpur','Sojat','Noorpur','Paravoor',
    'Murtijapur','Ramnagar','Sundargarh','Taki','Saundatti-Yellamma','Pathanamthitta','Wadi','Rameshwaram','Tasgaon',
    'Sikandra Rao','Sihora','Tiruvethipuram','Tiruvuru','Mehkar','Peringathur','Perambalur','Manvi','Zunheboto',
    'Mahnar Bazar','Attingal','Shahbad','Puranpur','Nelamangala','Nakodar','Lunawada','Murshidabad','Mahe','Lanka',
    'Rudauli','Tuensang','Lakshmeshwar','Zira','Yawal','Thana Bhawan','Ramdurg','Pulgaon','Sadasivpet','Nargund',
    'Neem-Ka-Thana','Memari','Nilanga','Naharlagun','Pakaur','Wai','Tarikere','Malavalli','Raisen','Lahar','Uravakonda',
    'Savanur','Sirohi','Udhampur','Umarga','Pratapgarh','Lingsugur','Usilampatti','Palia Kalan','Wokha','Rajpipla',
    'Vijayapura','Rawatbhata','Sangaria','Paithan','Rahuri','Patti','Zaidpur','Lalsot','Maihar','Vedaranyam','Nawapur',
    'Solan','Vapi','Sanawad','Warisaliganj','Revelganj','Sabalgarh','Tuljapur','Simdega','Musabani','Kodungallur',
    'Phulabani','Umreth','Narsipatnam','Nautanwa','Rajgir','Yellandu','Sathyamangalam','Pilibanga','Morshi','Pehowa',
    'Sonepur','Pappinisseri','Zamania','Mihijam','Purna','Puliyankudi','Shikarpur, Bulandshahr','Umaria','Porsa',
    'Naugawan Sadat','Fatehpur Sikri','Manuguru','Udaipur','Pipar City','Pattamundai','Nanjikottai','Taranagar',
    'Yerraguntla','Satana','Sherghati','Sankeshwara','Madikeri','Thuraiyur','Sanand','Rajula','Kyathampalle','Shahabad',
    ' Rampur','Tilda Newra','Narsinghgarh','Chittur-Thathamangalam','Malaj Khand','Sarangpur','Robertsganj','Sirkali',
    'Radhanpur','Tiruchendur','Utraula','Patratu','Vijainagar, Ajmer','Periyasemur','Pathri','Sadabad','Talikota',
    'Sinnar','Mungeli','Sedam','Shikaripur','Sumerpur','Sattur','Sugauli','Lumding','Vandavasi','Titlagarh','Uchgaon',
    'Mokokchung','Paschim Punropara','Sagwara','Ramganj Mandi','Tarakeswar','Mahalingapura','Dharmanagar','Mahemdabad',
    'Manendragarh','Uran','Tharamangalam','Tirukkoyilur','Pen','Makhdumpur','Maner','Oddanchatram','Palladam','Mundi',
    'Nabarangapur','Mudalagi','Samalkha','Nepanagar','Karjat','Ranavav','Pedana','Pinjore','Lakheri','Pasan','Puttur',
    'Vadakkuvalliyur','Tirukalukundram','Mahidpur','Mussoorie','Muvattupuzha','Rasra','Udaipurwati','Manwath','Adoor',
    'Uthamapalayam','Partur','Nahan','Ladwa','Mankachar','Nongstoin','Losal','Sri Madhopur','Ramngarh','Mavelikkara',
    'Rawatsar','Rajakhera','Lar','Lal Gopalganj Nindaura','Muddebihal','Sirsaganj','Shahpura','Surandai','Sangole',
    'Pavagada','Tharad','Mansa','Umbergaon','Mavoor','Nalbari','Talaja','Malur','Mangrulpir','Soro','Shahpura',
    'Vadnagar','Raisinghnagar','Sindhagi','Sanduru','Sohna','Manavadar','Pihani','Safidon','Risod','Rosera','Sankari',
    'Malpura','Sonamukhi','Shamsabad, Agra','Nokha','PandUrban Agglomeration','Mainaguri','Afzalpur','Shirur','Salaya',
    'Shenkottai','Pratapgarh','Vadipatti','Nagarkurnool','Savner','Sasvad','Rudrapur','Soron','Sholingur',
    'Pandharkaoda','Perumbavoor','Maddur','Nadbai','Talode','Shrigonda','Madhugiri','Tekkalakote','Seoni-Malwa',
    'Shirdi','SUrban Agglomerationr','Terdal','Raver','Tirupathur','Taraori','Mukhed','Manachanallur','Rehli',
    'Sanchore','Rajura','Piro','Mudabidri','Vadgaon Kasba','Nagar','Vijapur','Viswanatham','Polur','Panagudi',
    'Manawar','Tehri','Samdhan','Pardi','Rahatgarh','Panagar','Uthiramerur','Tirora','Rangia','Sahjanwa',
    'Wara Seoni','Magadi','Rajgarh (Alwar)','Rafiganj','Tarana','Rampur Maniharan','Sheoganj','Raikot','Pauri',
    'Sumerpur','Navalgund','Shahganj','Marhaura','Tulsipur','Sadri','Thiruthuraipoondi','Shiggaon','Pallapatti',
    'Mahendragarh','Sausar','Ponneri','Mahad','Lohardaga','Tirwaganj','Margherita','Sundarnagar','Rajgarh','Mangaldoi',
    'Renigunta','Longowal','Ratia','Lalgudi','Shrirangapattana','Niwari','Natham','Unnamalaikadai',
    'PurqUrban Agglomerationzi','Shamsabad, Farrukhabad','Mirganj','Todaraisingh','Warhapur','Rajam','Urmar Tanda',
    'Lonar','Powayan','P.N.Patti','Palampur','Srisailam Project (Right Flank Colony) Township','Sindagi','Sandi',
    'Vaikom','Malda','Tharangambadi','Sakaleshapura','Lalganj','Malkangiri','Rapar','Mauganj','Todabhim','Srinivaspur',
    'Murliganj','Reengus','Sawantwadi','Tittakudi','Lilong','Rajaldesar','Pathardi','Achhnera','Pacode','Naraura',
    'Nakur','Palai','Morinda, India','Manasa','Nainpur','Sahaspur','Pauni','Prithvipur','Ramtek','Silapathar','Songadh',
    'Safipur','Sohagpur','Mul','Sadulshahar','Phillaur','Sambhar','Prantij','Nagla','Pattran','Mount Abu','Reoti',
    'Tenu dam-cum-Kathhara','Panchla','Sitarganj','Pasighat','Motipur','O\' Valley','Raghunathpur','Suriyampalayam',
    'Qadian','Rairangpur','Silvassa', 'Nowrozabad (Khodargama)','Mangrol','Soyagaon','Sujanpur','Manihari',
    'Sikanderpur','Mangalvedhe','Phulera','Ron','Sholavandan','Saidpur','Shamgarh','Thammampatti','Maharajpur','Multai',
    'Mukerian','Sirsi','Purwa','Sheohar','Namagiripettai','Parasi','Lathi','Lalganj','Narkhed','Mathabhanga',
    'Shendurjana','Peravurani','Mariani','Phulpur','Rania','Pali','Pachore','Parangipettai','Pudupattinam',
    'Panniyannur','Maharajganj','Rau','Monoharpur','Mandawa','Marigaon','Pallikonda','Pindwara','Shishgarh','Patur',
    'Mayang Imphal','Mhowgaon','Guruvayoor','Mhaswad','Sahawar','Sivagiri','Mundargi','Punjaipugalur','Kailasahar',
    'Samthar','Sakti','Sadalagi','Silao','Mandalgarh','Loha','Pukhrayan','Padmanabhapuram','Belonia','Saiha',
    'Srirampore','Talwara','Puthuppally','Khowai','Vijaypur','Takhatgarh','Thirupuvanam','Adra','Piriyapatna','Obra',
    'Adalaj','Nandgaon','Barh','Chhapra','Panamattom','Niwai','Bageshwar','Tarbha','Adyar','Narsinghgarh','Warud',
    'Asarganj','Sarsod'
  ];
  states : Array<any> = [
    'Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh', 'Delhi','Goa','Gujarat','Haryana',
    'Himachal Pradesh','Jammu and Kashmir','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra',
    'Manipur','Meghalaya','Mizoram','Nagaland','Odisha(Orissa)','Punjab','Rajasthan','Sikkim','Tamil Nadu',
    'Tripura','Uttar Pradesh','Uttarakhand','West Bengal'
  ];
  stateCtrl: FormControl;
  cityCtrl: FormControl;
  curation:Curation;
  filteredStates: any;
  filteredCities: any;
  constructor(private authService: AuthService,
              private sanitizer:DomSanitizer,
              private _fs:CollectionFormService,
              private router:Router
  ) {
    const config = {
      apiKey: "AIzaSyCcs4bYrNVSzwWxR7puCL3onX4CcnxYiTo",
      authDomain: "curator-portal.firebaseapp.com",
      databaseURL: "https://curator-portal.firebaseio.com",
      storageBucket: "curator-portal.appspot.com",
      messagingSenderId: "84592978554"
    };
    try{
      firebase.initializeApp(config);
    }
    catch (e){
      console.log(e.code);
      if(e.code != 'app/duplicate-app')
        alert(e.message);
    }
    this.stateCtrl = new FormControl();
    this.filteredStates = this.stateCtrl.valueChanges
      .startWith(null)
      .map(name => this.filterStates(name));

    this.cityCtrl = new FormControl();
    this.filteredCities = this.cityCtrl.valueChanges
      .startWith(null)
      .map(name => this.filterCities(name));
  }
  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser().uid;
    this.curation = this._fs.getCuration();
    if(this.curation)
    {
      this.fileUrl = this.curation.curationCoverImage;
      this.fileLocalRef = this.curation.curationCoverImage;
    }
    console.log(this.curation);
  }

  showImage(event:any){
    this.file = event.target.files[0];
    this.fileLocalRef = URL.createObjectURL(this.file);
    this.fileLocalRef = this.sanitizer.bypassSecurityTrustUrl(this.fileLocalRef);
  }

  uploadImage(){
    this.filePath = this.currentUser+'/'+this._fs.getCurationId()+'/coverImage.';

    this.progress = '0';
    let possext = ['jpg','jpeg','png','bmp','gif'];
    let ext = this.file.name.split('.').pop().toLowerCase();
    if(this.file && possext.indexOf(ext) != -1){
      const storageRef = firebase.storage().ref('public');
      let uploadTask: firebase.storage.UploadTask = storageRef.child('images/'+this.filePath+ext).put(this.file);
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {
          this.progress = ((snapshot.bytesTransferred / snapshot.totalBytes)*100).toFixed(2);
        },
      (error) => console.log(error),
        () => {
        firebase.storage().ref('public').child('images/'+this.filePath+ext).getDownloadURL().then(
          url => {
            if(url) {
              this.fileUrl = url;
              swal("Uploaded", "The Image has been uploaded successfully", "success");
            }
          }
        );
        }
      )
    }
  }

  storeSelectData(event, type){
    console.log(event.text, type);
  }

  NextSteps(f:any){
    let data = {};
    data['curationTitle'] = f.value.collectionTitle;
    data['curationCoverImage'] = this.fileUrl;
    data['curationDescription'] = f.value.collectionDescription;
    data['curationStoreLocation'] = f.value.retailOutletAddress;
    data['curationCity'] = this.cityCtrl.value;
    data['curationState'] = this.stateCtrl.value;
    data['curatorId'] = this.currentUser;
    console.log(data['curatorId']);
    this._fs.CollectionGeneralDetails(data);
    this.router.navigate(['/profile','new', this._fs.getCurationId()]);
  }

  filterStates(val: string) {
    return val ? this.states.filter((s) => new RegExp(val, 'gi').test(s)) : this.states;
  }

  filterCities(val: string) {
    return val ? this.cities.filter((c) => new RegExp(val, 'gi').test(c)) : this.cities;
  }

  isValid():boolean{
    return this.fileUrl != null &&
      this.states.indexOf(this.stateCtrl.value) != -1 &&
      this.cities.indexOf(this.cityCtrl.value) != -1 &&
        this.cityCtrl.value != null &&
        this.stateCtrl.value != null
  }
}
