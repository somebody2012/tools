export default {
  // 从词根表中找单词
  findEnFieldFromWordRoot(cnField,allWordRoot){
    let fieldCharsArr = cnField.split("");
    let curIndex = 0;
    let enFields = [];
    let cnFields = [];
    while(curIndex < fieldCharsArr.length){
      let enFieldItems = [];
      for(let i=curIndex;i<fieldCharsArr.length;i++){
        let cnFieldItem = fieldCharsArr.slice(curIndex,i+1).join("");
        let tempEnFieldObj = this.findWord(cnFieldItem,allWordRoot);
        if(tempEnFieldObj){
          enFieldItems.push({cnField:tempEnFieldObj.value,index:i,label:tempEnFieldObj.label});
        }
      }
      if(enFieldItems.length == 0) return "";// 没根据词根找到单词
      let indexs = enFieldItems.map(v => v.index);
      let maxIndex = Math.max.apply(null,indexs);
      curIndex = maxIndex+1;
      let maxIndexObj = enFieldItems.find(v => v.index == maxIndex);
      enFields.push(maxIndexObj.cnField);
      cnFields.push(maxIndexObj.label);
    }
    return {
      enField:enFields.join("_"),
      cnField:cnFields.join("+")
    };
  },
  findWord(curField,allWordRoot){
    let resObj =  allWordRoot.find(v => v.label == curField);
    if(resObj){
      return {
        label:resObj.label,
        value:resObj.value
      };
    }
  }
}