export function getBooksOptions(data){
    return data.payload.map(record => {
        return {
            label: record.book.toUpperCase().split('_').join(' a '),
            value: record.book
        }
    })
}