import Vue from 'vue'
import {Button, Header, Main, Footer, Container, Row, Col, Menu, MenuItem, Submenu, Carousel, CarouselItem, Input, Form, FormItem, Message} from 'element-ui'

const components = {Button, Header, Main, Footer, Container, Row, Col, Menu, MenuItem, Submenu, Carousel, CarouselItem, Input, Form, FormItem}
Object.values(components).forEach((component) => {
    console.log('element plugin', component)
    Vue.use(component)
})


Vue.prototype.$message = Message
