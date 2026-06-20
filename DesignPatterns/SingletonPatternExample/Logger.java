package SingletonPatternExample;
class Logger{
  private static Logger instance = new Logger();
  private Logger(){
    System.out.println("Logger initiated");
  }
  public static Logger getInstance(){
    return instance;
  }


}

class Test{
  public static void main(String[] args) {
    Logger A = Logger.getInstance();
    Logger B = Logger.getInstance();
  }
}
