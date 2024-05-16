import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

public class Main {
    private static final Logger logger = Logger.getLogger(Main.class.getName());

    public static void main(String[] args) {
        List<Integer> numberList = new ArrayList<>();
        BinarySearch binarySearch = new BinarySearch();

        for (int i = 0; i <= 1000000; i++ ) {
            numberList.add(i);
        }

//        ------------------------
//        Binary search: O(log n)
//        ------------------------
        binarySearch.find(numberList, 869082); // 20 operations

////        --------------------
////        Linear search: O(n)
////        --------------------
//        int count = 0;
//        int number = 869082;
//        boolean isFound = false;
//
//        for (int i : numberList) {
//            count++;
//
//            if (i == number) {
//                isFound = true;
//
//                break;
//            };
//        }
//
//        logger.info((isFound ? "Number is found" : "Number not found") +
//                        ". Number of operations: " + count); // 869083 operations

    }
}
