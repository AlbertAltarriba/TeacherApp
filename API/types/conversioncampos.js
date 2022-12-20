"use strict";
// // INTERCAMBIO FRONT-BACK SUBJECTS
// let frontUser ={email:"",name:"",password:"",tipo:"",active:false};
// type TipoFrontUser=typeof frontUser
// let backUser={user_email: "",user_password: "",user_type: "",user_deleted: "",user_username:""};
// type TipoBackUser=typeof backUser;
// let frontsUser:TipoFrontUser[]=[];
// function convertir_a_front_user(backUser:TipoBackUser){;
//   // frontUser.id_user=backUser.user_id;
//    frontUser.email=backUser.user_email;
//    frontUser.active=((backUser.user_deleted=="SI")?false:true);
//    frontUser.password=backUser.user_password;
//    // NO LO USAR EL FRONTEND back.user_username=;
//    frontUser.tipo=backUser.user_type;
//   return frontUser;}
//   function convertir_de_front_user(frontUser:TipoFrontUser){
//  //  backUser.user_id=frontUser.id_user;
//    backUser.user_email=frontUser.email; 
//    backUser.user_password=frontUser.password,
//    backUser.user_username="";
//    backUser.user_type=frontUser.tipo;
//    backUser.user_deleted=(frontUser.active?"NO":"SI"); //NO activo - booleano
//    // NO LO USAR EL FRONTEND back.user_username=;
//    return backUser;}
//    // UT:User Teacher
//    let frontUT ={
//     id:"",id_subject:"",id_user:"",teach_id:"",name:"",password:"",tipo:"",last_name:"",address:"",email:"",phone:"",image:"",description:"",experience:"",price:"",validate:false,active:false,
//     city:"",zip:""};
//    type TipoFrontUT=typeof frontUT;
//    let backUT={
//     user_id:"",user_email: "",user_password: "",user_username:"",user_type: "",user_deleted: "", teach_id: "",teach_name: "",teach_last_name:"",teach_image:"",teach_zip: "",teach_address: "",teach_phone: "",teach_city: "",teach_price_an_hour:"",teach_description:"",teach_experience_years:"",teach_validated: "",teach_id_user:"",teach_id_subject:""
//   };
//    type TipoBackUT=typeof backUT;
//    let frontsUT:TipoFrontUT[]=[];
//    function convertir_a_front_teacher_user(back:TipoBackUT){;
//     frontUT.id=back.user_id;  // 1
//     frontUT.id_subject=back.teach_id_subject;
//     frontUT.id_user=back.teach_id_user;
//     frontUT.password=back.user_password;
//     frontUT.tipo=back.user_type;
//     frontUT.teach_id=back.teach_id; //2
//     frontUT.name=back.teach_name;
//     frontUT.last_name= back.teach_last_name;
//     frontUT.address=back.teach_address;
//     frontUT.email=back.user_email;
//     frontUT.phone=back.teach_phone;
//     frontUT.image=back.teach_image;
//     frontUT.description=back.teach_description;
//     frontUT.experience=back.teach_experience_years;
//     frontUT.price=back.teach_price_an_hour;
//     frontUT.validate=((back.teach_validated=="SI")?true:false);
//     frontUT.active=((back.user_deleted=="SI")?false:true);;
//     frontUT.city=back.teach_city;
//     frontUT.zip=back.teach_zip;
//    return frontUT;}
// // UT:User Teacher
//    let frontTeacher ={
//     id:"",id_subject:"",id_user:"",teach_id:"",name:"",password:"",tipo:"",last_name:"",address:"",email:"",phone:"",image:"",description:"",experience:"",price:"",validate:false,active:false,
//     city:"",zip:""};
//    type TipoFrontTeacher=typeof frontTeacher;
//    let backTeacher={teach_id: "",teach_name: "",teach_last_name:"",teach_image:"",teach_zip: "",teach_address: "",teach_phone: "",teach_city: "",teach_price_an_hour:"",teach_description:"",teach_experience_years:"",teach_validated: "",teach_id_user:"",teach_id_subject:""
//   };
//    type TipoBackTeacher=typeof backTeacher;
//    let frontsTeacher:TipoFrontTeacher[]=[];
//    function convertir_de_front_teacher_user(front:TipoFrontTeacher){;
//     backUT.user_email=front.email; 
//     backUT.user_password=front.password,
//     backUT.user_username="";
//     backUT.user_type=front.tipo;
//     backUT.user_deleted=(front.active?"NO":"SI"); //NO activo - booleano
//     backUT.teach_id=front.id; 
//     backUT.teach_id_user=front.id_user;
//     backUT.teach_id_subject=front.id_subject;
//     backUT.teach_name=front.name;
//     backUT.teach_last_name=front.last_name;
//     backUT.teach_address=front.address;
//     backUT.teach_phone=front.phone;
//     backUT.teach_image=front.image;
//     backUT.teach_description=front.description;
//     backUT.teach_experience_years=front.experience;
//     backUT.teach_price_an_hour=front.price;
//     backUT.teach_validated=(front.validate)?"SI":"NO";
//     backUT.teach_city=front.city;
//     backUT.teach_zip=front.zip;
//    return backUT;}
//    function convertir_de_front_teacher(front:TipoFrontTeacher){;
//     backTeacher.teach_id=front.id; 
//     backTeacher.teach_id_user=front.id_user;
//     backTeacher.teach_id_subject=front.id_subject;
//     backTeacher.teach_name=front.name;
//     backTeacher.teach_last_name=front.last_name;
//     backTeacher.teach_address=front.address;
//     backTeacher.teach_phone=front.phone;
//     backTeacher.teach_image=front.image;
//     backTeacher.teach_description=front.description;
//     backTeacher.teach_experience_years=front.experience;
//     backTeacher.teach_price_an_hour=front.price;
//     backTeacher.teach_validated=(front.validate)?"SI":"NO";
//     backTeacher.teach_city=front.city;
//     backTeacher.teach_zip=front.zip;
//    return backTeacher;}
// //    function convertir_a_front(back:TipoBackUT){
// //     frontUT.id_user=back.user_id;
// //     frontUT.email=back.user_email;
// //     frontUT.active=((back.user_deleted=="SI")?false:true);
// //     frontUT.password=back.user_password;
// //     // NO LO USAR EL FRONTEND back.user_username=;
// //     frontUT.tipo=back.user_type;
// //     frontUT.id=back.teach_id;
// //     frontUT.id_subject=back.teach_id_subject;
// //     frontUT.id_user=back.user_id;
// //     frontUT.name=back.teach_name;
// //     frontUT.last_name= back.teach_last_name;
// //     frontUT.address=back.teach_address;
// //     frontUT.email=back.user_email;
// //     frontUT.phone=back.teach_phone;
// //     frontUT.image=back.teach_image;
// //     frontUT.description=back.teach_description;
// //     frontUT.experience=back.teach_experience_years;
// //     frontUT.price=back.teach_price_an_hour;
// //     frontUT.validate=((back.teach_validated=="SI")?true:false);
// //     frontUT.active=((back.user_deleted=="SI")?false:true);;
// //     frontUT.city=back.teach_city;
// //     frontUT.zip=back.teach_zip;
// //    }
//    module.exports={frontUser,frontUT,frontTeacher,backTeacher,backUser,backUT,frontsUser,frontsUT,convertir_a_front_user,convertir_de_front_user,convertir_de_front_teacher,convertir_a_front_teacher_user,convertir_de_front_teacher_user}
