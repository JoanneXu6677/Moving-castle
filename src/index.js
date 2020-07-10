import $ from 'jquery'
import './css/1.css'
import './css/1.less'

$(function() {
    $('li:odd').css('backgroundColor', 'yellow')
    $('li:even').css('backgroundColor', 'lightblue')
})

class Person {
    static info = 'aaa';
}
console.log(Person.info)