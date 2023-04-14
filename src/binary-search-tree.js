const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/

class Node {
  constructor(data) {
  this.data = data;
  this.left = null;
  this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.base = null; // корень bst
  }
// вернуть корневой узел дерева
  root() {
    return this.base; 
  }
  //добавить узел с dataв дерево
  add(data) {
    this.base = addInside(this.base, data); // добавь в корень то что вернет F
      //далее сам метод добавления
    function addInside(node, data) {
      if (!node) { // узела нет? (вакантное место)
        return new Node(data); //тогда добавить новый узел
      }

      if (node.data === data) { // такой узел существует?
        return node; // ничего не делаем, просто возвращам текущей узел (только уникальные значения)
      }

      if (data < node.data) { // если значение которое мы хотим добавить меньше, чем значение в текущем узле, то
        node.left = addInside(node.left, data);// у этого узла левый потомок будет
      } else { //иначе (data>node.data)
        node.right = addInside(node.right, data);// идем в правое поддерево. правый потомок текущего узла будет
      }
      return node; // вернем текущей узел
    }
  }
  //возвращает true, если узел с таким data существует в дереве и falseв противном случае
  has(data) {
   return sercheInside(this.base, data);

   function sercheInside(node, data) {
    if (!node) { // нет такого узла?
      return false // вернуть false
    }
    if (node.data === data) { // если значение узла который нашли равен искомому значению
      return true; // вернуть true
    }
    return data < node.data ? 
    sercheInside(node.left, data) :
    sercheInside(node.right, data);
   }
  }
  //возвращает узел с узлом data if с существующим в дереве и в противном случае data null
  find(data) {
    return sercheInside(this.base, data);

    function sercheInside(node, data) {
     if (!node) { // нет такого узла?
       return null // вернуть null
     }
     if (node.data === data) { // если значение узла который нашли равен искомому значению
       return node; // вернуть узел этого узла, где есть в потомках наше значение
     }
     return data < node.data ? 
     sercheInside(node.left, data) :
     sercheInside(node.right, data);
    }

    /*let node = this.base; 
    while (node !== null) {
      if (node.data === data) {
        return node;
      } else if (data < node.data) {
        node = node.left;
      } else {
        node = node.right;
      }
    }
    return null;*/
  }
  //удаляет узел с data из дерева, если узел с таким data существует
  remove(data) {
    this.base = removeNode(this.base, data); // удали узел (в каком поддереве, какое значение)
    
    function removeNode(node, data) {
      if (!node) {// нет узла? (точка остановки реккурсии)
        return null; // верни null (его и верни)
      }
      //далее определяем в какую сторону пойдем
      if (data < node.data) { //искомое значение меньше чем в текущем узле
        node.left = removeNode(node.left, data);//идем налево
        return node;
      } else if (node.data < data) {//искомое значение больше чем в текущем узле
        node.right = removeNode(node.right, data);//идем направо, удали в правом поддереве значении data а результат положи в node.right
        return node;//верни обновленное поддерево
      } else {
        //значения одинаковые.  равно 
        //проверяем вдруг узел является листом (нет ни правого ни левого поддерева)
        if(!node.left && !node.right){//нет потомков
          return null;
        }
        //нет левого потомка
        if(!node.left) {
          node = node.right;
          return node;
        }
        //нет правого потомка(поддерева)
        if (!node.right) {
          node = node.left;
          return node;
        }
    //есть оба поддерева.. решили будем искать минимального среди правого поддерева
        let minFromRight = node.right; //начинаем с корня правого поддерева
        //идем влево до конца
        while(minFromRight.left) { // пока элемент слева есть - мы перемещаемся к нему
          minFromRight = minFromRight.left;//указатель сдвигаем пока двигаемся влево
        }
        //как только нашли минимальный элемент в правом поддереве
        //мы его значение помещаем в значение удаляемого узла
        node.data = minFromRight.data; //скопировали его
        //теперь нужно удалить это значение из правого поддерева
        node.right = removeNode(node.right, minFromRight.data)//обновили правое поддерево

        return node;
      }
    }
  }
  //возвращает минимальное значение, хранящееся в дереве (или null если в дереве нет узлов )
  min() {
    //а есть вообще элементы? (если нет корня дерева - то и нет элементов)
    if(!this.base) {
      return; //вернем undefined
    }
    //далее заведем переменную, которая будет ходить и искать самый маленький элемент
    let node = this.base;
    //далее ходим по левым элементам(левым поддеревьям)
    while(node.left) {
      node = node.left;
    }
    //как дошли до самого маленького, возвращаем его значение
    return node.data;
  }
  //возвращает максимальное значение , хранящееся в дереве (или null если в дереве нет узлов )
  max() {
    //а есть вообще элементы? (если нет корня дерева - то и нет элементов)
    if(!this.base) {
      return; //вернем undefined
    }
    //далее заведем переменную, которая будет ходить и искать самый большой элемент
    let node = this.base;
    //далее ходим по правым элементам(правым поддеревьям)
    while(node.right) {
      node = node.right;
    }
    //как дошли до самого большого, возвращаем его значение
    return node.data;
  }
}

module.exports = {
  BinarySearchTree
};