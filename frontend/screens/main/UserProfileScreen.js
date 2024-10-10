// import { View, Text, StyleSheet, Switch, Image } from 'react-native'
// import React, { useContext, useEffect, useState } from 'react'
// import { GlobalStyles } from '../../constants/globalStyles'
// import CoinIcon from "../../assets/coin.png"
// import PremiumIcon from "../../assets/premium.png"
// import Button from '../../components/Button'
// import { UserContext } from '../../store/user-context'
// import { calculatePremiumTime } from '../../utils/utilsFuncs'

// const UserProfileScreen = () => {
//   const [isLight, setIsLight] = useState('true')
//   const userContext = useContext(UserContext)
//   const [hours, setHours] = useState(0)

//   useEffect(() => {
//     const premiumTime = new Date(userContext.premiumTime)
//     setHours(calculatePremiumTime(premiumTime))
//   }, [userContext.googleUserId])

//   function toggleThemColor() {
//     setIsLight(prevValue => !prevValue)
//   }

//   return (
//     <View style={[styles.container]}>
//       <View style={[styles.subContainer]}>
//         <View style={styles.content}>
//           <View style={styles.titleWrapper}><Text style={[styles.title, styles.bold]}>Information</Text></View>
//           <View style={[styles.bodyTop]}>
//             <Image 
//               source={{uri: "https://lh3.googleusercontent.com/a/ACg8ocL696AqTjNjUyOSrJG4UFgH-wxIeGT6iaz5722JHIT0hYB0Ew=s96-c"}}
//               style={{width: 50, height: 50, borderRadius: 10}}
//             />
//             <Text 
//               style={{textAlign: 'center', color: GlobalStyles.primaryColor, fontSize: 20, fontWeight: 'bold'}}>
//                 {userContext.email}
//             </Text>
//           </View>
//           <View style={styles.bodyBottom}>
//             <View style={{flex: 1, alignItems: 'center', }}>
//               <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
//                 <Image source={CoinIcon} style={{width: 23, height: 23}}/>
//                 <Text style={[styles.bold, {color: '#FFC000', fontSize: 23, marginLeft: 10}]}>Coin</Text>
//               </View>
//               <View>
//                 <Text style={[styles.bold, {color: '#FFC000', fontSize: 23, marginLeft: 10}]}>{userContext.coin}</Text>
//               </View>
//             </View>
//             <View style={{flex: 1, alignItems: 'center'}}>
//               <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
//                 <Image source={PremiumIcon} style={{width: 30, height: 30}}/>
//                 <Text style={[styles.bold, {color: GlobalStyles.primaryColor, fontSize: 23, marginLeft: 10}]}>Premium</Text>
//               </View>
//               <View>
//                 <Text style={[styles.bold, {color: GlobalStyles.primaryColor, fontSize: 23, marginLeft: 10}]}>{hours}h</Text>
//               </View>
//             </View>
//           </View>
//         </View>
//       </View>
//       <View style={[styles.subContainer]}>
//         <View style={[styles.content]}>
//           <View style={styles.titleWrapper}><Text style={[styles.title, styles.bold]}>Setting</Text></View>
//           <View style={[styles.bodyTop, {flexDirection: 'row'}]}>
//             <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//               <Text style={[{color: GlobalStyles.primaryColor, fontSize: 17, fontWeight: 'bold'}]}>Theme color</Text>
//             </View>
//             <View style={[styles.switchWrapper, {flex: 1}]}>
//               <Text style={[styles.textColor]}>Light</Text>
//               <Switch 
//                 trackColor={{ false: "white", true: 'black' }}
//                 thumbColor={'#FFC000'}
//                 onValueChange={toggleThemColor}
//                 value={isLight}
//                 style={[{height: 40}]}
//               />
//               <Text style={[styles.textColor]}>Dark</Text>
//             </View>
//           </View>
//           <View style={[styles.bodyBottom]}>
//             <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//               <Text style={[{color: GlobalStyles.primaryColor, fontSize: 17, fontWeight: 'bold'}]}>Language</Text>
//             </View>
//             <View style={[{flex: 1, justifyContent: 'center', alignItems: 'center'}]}>
//               <Text style={[styles.textColor]}>English</Text>
//             </View>
//           </View>
//         </View>
//       </View>
//       <View style={styles.subContainer}>
//         <View style={[styles.content, {paddingHorizontal: GlobalStyles.spacing}]}>
//           <View style={styles.titleWrapper}><Text style={[styles.title, styles.bold]}>Contact Us</Text></View>
//           <Text style={styles.textColor}>If you have any problems, please feel free to contact us by email</Text>
//           <Text style={styles.textColor}><Text style={styles.bold}>Email</Text>:  subexchange@gmail.com</Text>
//         </View>
//       </View>
//       <View style={[styles.subContainer, {justifyContent: 'center', flex: 1}]}>
//         <Button title={"Log out"} />
//       </View>
//     </View>
//   )
// }

// export default UserProfileScreen

// const styles = StyleSheet.create({
//   container: {
//     width: '100%',
//     height: '100%',
//     paddingHorizontal: GlobalStyles.spacing,
//     alignItems: 'center'
//   }, 
//   subContainer: {
//     marginTop: 30,
//     alignItems: 'center',
//     width: '100%',
//   },
//   content: {
//     backgroundColor: GlobalStyles.secondaryColor,
//     borderRadius: 10,
//     paddingVertical: 10,
//     width: "100%"
//   },
//   bodyTop: {
//     width: '100%',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   bodyBottom: {
//     marginTop: 10,
//     width: '100%',
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   grayBg: {
//     backgroundColor: GlobalStyles.secondaryColor
//   },
//   switchWrapper: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   textColor: {
//     color: GlobalStyles.primaryColor
//   },
//   titleWrapper: {
//     // width
//     backgroundColor: GlobalStyles.secondaryColor,
//     borderTopLeftRadius: 10, borderTopRightRadius: 10
//   },
//   title: {
//     fontSize: 22,
//     textAlign: 'center',
//     color: 'black',
//     marginBottom: 10
//   },
//   bold: {
//     fontWeight: 'bold'
//   },
//   fullWidth: {
//     width: '100%'
//   }
// })