export default {
  // 从词根表中找单词
  findEnFieldFromWordRoot(cnField,allWordRoot){
    let fieldCharsArr = cnField.split("");
    let curIndex = 0;
    let enFields = [];
    while(curIndex < fieldCharsArr.length){
      let enFieldItems = [];
      for(let i=curIndex;i<fieldCharsArr.length;i++){
        let cnFieldItem = fieldCharsArr.slice(curIndex,i+1).join("");
        let tempEnField = this.findWord(cnFieldItem,allWordRoot);
        if(tempEnField){
          enFieldItems.push({cnField:tempEnField,index:i});
        }
      }
      if(enFieldItems.length == 0) return "";// 没根据词根找到单词
      let indexs = enFieldItems.map(v => v.index);
      let maxIndex = Math.max.apply(null,indexs);
      curIndex = maxIndex+1;
      let maxIndexObj = enFieldItems.find(v => v.index == maxIndex);
      enFields.push(maxIndexObj.cnField);
    }
    return enFields.join("_");
  },
  findWord(curField,allWordRoot){
    let resObj =  allWordRoot.find(v => v.label == curField);
    if(resObj){
      return resObj.value;
    }
  }
}