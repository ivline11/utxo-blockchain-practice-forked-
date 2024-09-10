class Transaction {
  constructor(inputUTXOs, outputUTXOs) {
    this.transaction = { inputUTXOs, outputUTXOs };
  }
  execute() {
    const isDoubleSpend = this.transaction.inputUTXOs.findIndex(
      (utxo) => utxo.spent == true
    );

    if (isDoubleSpend !== -1) {
      throw new Error("input TXO is already spent.");
    }

    /**
     * 📚 Mission 1.
     * 입력 UTXO의 총값이 출력 UTXO의 총값을 커버할 만큼 충분한지 확인한다.
     * 입력의 총값이 출력의 총값보다 작으면 execute 함수에서 에러를 던진다.
     */
    const inputTotal = this.transaction.inputUTXOs.reduce(
      (total, utxo) => total + utxo.amount,
      0
    );
    const outputTotal = this.transaction.outputUTXOs.reduce(
      (total, utxo) => total + utxo.amount,
      0
    );
    if (inputTotal < outputTotal) {
      throw new Error("Input UTXO total is less than output UTXO total.");
    }
  }
}
module.exports = Transaction;
