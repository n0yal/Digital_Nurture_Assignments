package FactoryMethodPatternExample;
abstract class Document{
  abstract void open();



}
class PdfDocument extends Document{
  void open(){

    System.out.println("Pdf Document Opened");
  }

}
class ExcelDocument extends Document{
  void open(){
    System.out.println("Excel Document Openeded");
  }


}



class WordDocument extends Document{
  void open(){
    System.out.println("Word Document Openeded");
  }
}

abstract class DocumentFactory{
  abstract Document createDocument();
}

class CreateWord extends DocumentFactory{
  @Override
  Document createDocument(){
    return new WordDocument();


  }

}
class CreatePdf extends DocumentFactory{
  Document createDocument(){
    return new PdfDocument();
  }
}

class Test{
  public static void main(String[] args) {
  }
}




