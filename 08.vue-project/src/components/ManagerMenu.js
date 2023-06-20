// 普通的渲染组件，函数式组件是没有this的
import { createNamespacedHelpers } from "vuex";

let { mapState } = createNamespacedHelpers("user");
export default {
    data() {
        return {
            list: [],
        };
    },
    computed: {
        ...mapState(["userInfo"]),
    },
    methods: {
        getMenuList(auths) {
            let arr = [];
            let map = {};
            auths.forEach((m) => {
                m.children = [];
                map[m.authId] = m; // {1:菜单, 2:菜单}
                if (m.pid === -1) {
                    arr.push(m); // 如果是根，就直接push到menu中
                } else {
                    map[m.pid] && map[m.pid].children.push(m);
                }
            });
            return arr;
        },
    },
    mounted() {
        console.log("Manager-Menu", this.userInfo.auths);
        this.list = this.getMenuList(this.userInfo.auths);
        console.log("Manager-Menu list", this.list);
    },
    render() {
        let renderChildren = (list) => {
            return list.map((menu) => {
                return menu.children.length > 0 ? (
                    <el-submenu index={String(menu.authId)}>
                        <template slot="title">
                            <span>{menu.name}</span>
                        </template>
                        {renderChildren(menu.children)}
                    </el-submenu>
                ) : (
                    <el-menu-item index={menu.path}>
                        <span slot="title">{menu.name}</span>
                    </el-menu-item>
                );
            });
        };
        return (
            <el-menu background-color="#333" text-color="#fff" active-text-color="#ffd04b" class="menu" router={true}>
                {renderChildren(this.list)}
            </el-menu>
        );
    },
};
