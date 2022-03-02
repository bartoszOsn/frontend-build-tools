const buffer = {
    str: '',
    log(value){
        this.str += value;
    },
    elementOpen(tag, attrs){
        const attrsString = Object.entries(attrs)
            .map(([key, value]) => key + '="' + value + '"')
            .join( );
        this.log(`<${tag} ${attrsString}>`);
    },
    elementClose(tag){
        this.log(`</${tag}>`);
    },
    value(value){
        this.log(value);
    }
};

//==============================

let rootClass = 'app-table';
function row(num, text) {
    buffer.elementOpen('tr', {});
    buffer.elementOpen('td', {});
    buffer.value("#");
    buffer.value(num);
    buffer.elementClose('td');
    buffer.elementOpen('td', {});
    buffer.value("Text: ");
    buffer.value(text);
    buffer.elementClose('td');
    buffer.elementClose('tr');
}

buffer.elementOpen('table', { "class": rootClass});
const texts = ['Ala', 'ma', 'kota', 'kot', 'ma', 'Alę'];
for (let i = 0; i < 6; i++) {
    row(i + 1, texts[i]);
}
buffer.elementClose('table');