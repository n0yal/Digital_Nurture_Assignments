
import java.util.Scanner;

class Product{
  int productId;
  String  productName;
  String productCategory;
  Product( int pid, String name,String category){
    this.productId = pid;
    this.productName = name;
    this.productCategory = category;
  }

}


class Main{
  public static void main(String[] args) {
    Product a = new Product(1, "Shirt", "Fashion");
    Product b = new Product(2, "Jeans", "Fashion");
    Product c = new Product(3, "Mobile", "Electronics");
    Product arr[] = {a,b,c};
    Scanner sc = new Scanner(System.in);
    System.out.println("Enter the product name to search");
    String search = sc.next();
    // Linear Search ........................
    int flag = 0;
    for(int i = 0;i<arr.length;i++){
      if(arr[i].productName.toLowerCase().equals(search.toLowerCase())){
        flag = 1;
        System.out.println("Found at index" + " " + i);
      }

    }
    if(flag == 0){
      System.out.println("Elemenent not found");
    }

    //Binary Search ......................
    int l = 0;
    int r = arr.length - 1;
    int mid;
    System.out.println("BINARY SEARCH:");
    flag = 0;
    while(l<=r){
      mid = (l+r)/2;
      if(arr[mid].productName.equalsIgnoreCase(search)){
        System.out.println("Found at index" + " " + mid);
        flag = 1;
        break;
      }
      else if(search.compareTo(arr[mid].productName) < 0 ){
        r = mid - 1;

      }
  else{
    l = mid + 1;

  }
    sc.close();
  }
  }
}
