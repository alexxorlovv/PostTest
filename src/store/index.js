import mutations from "./mutations"
import actions from "./actions"
import modules from "./modules/"




export default {
  state: {
    headers: {
      "Authorization": "Bearer iePNMpkJQ7qmToSFuSaGiIAPo9UoihhwJCg6zTxouidiBmVqMIfsD0zWJkn9",
     //"ContentType": "application/json",
      //crossDomain: true,
      'Accept': "application/json"
     // 'X-Requested-With': 'XMLHttpRequest'
    },
    baseUrl: "https://sample-api.brizo.ru/api/"
  },
  mutations,
  actions,
  modules
}
