const countDiscount = (price, disc ) => {
    let value = disc / 100;
    let totalValue = price - (price * value);
    return totalValue;
}

export default countDiscount;