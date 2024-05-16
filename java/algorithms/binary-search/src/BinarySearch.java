import java.util.List;
import java.util.logging.Logger;

public class BinarySearch {
    private final Logger logger = Logger.getLogger(BinarySearch.class.getName());

    private int low;
    private int high;

    public int getLow() {
        return this.low;
    }

    public void setLow(int low) {
        this.low = low;
    }

    public int getHigh() {
        return this.high;
    }

    public void setHigh(int high) {
        this.high = high;
    }

    public void find(List<Integer> numberList, int number) {
        int index = -1;
        int operationCounter = 0;

        this.setHigh(numberList.size() - 1);

        while (this.low <= this.high) {
            operationCounter++;

            int currentIndex = (this.low + this.high) / 2;

            if (number < numberList.get(currentIndex)) {
                this.setHigh(currentIndex - 1);
            } else if (number > numberList.get(currentIndex)) {
                this.setLow(currentIndex + 1);
            } else {
                index = currentIndex;

                break;
            }
        }

        String message = index >= 0
                ? "Number is found at index: " + index
                : "Number not found";

        this.logger.info(message + ". Number of operations: " + operationCounter);
    }

}
