import { Vue, Component } from 'vue-property-decorator';

@Component({
  name: 'weui-demo-image',
})
export default class DemoImage extends Vue {
  render() {
    return (
      <div class="weui-demo demo-image" style="padding:10px;">
        <h2>v-image</h2>
        <h3>图片</h3>

        <p>default</p>
        <v-image src="http://placekitten.com/g/100/100" style="height: 100px;width: 100px;" />
        <br />
        <p>defaultSrc</p>
        <v-image
          src="http://placekitten.com/g/1000/1000"
          defaultSrc="https://via.placeholder.com/100x100.png?text=Loading"
          style="height: 100px;width: 100px;"
        />

        <br />
        <p>circle</p>
        <v-image circle src="http://placekitten.com/g/100/100" style="height: 100px;width:100px;" />

        <br />
        <p>bordered</p>
        <v-image
          bordered
          src="http://placekitten.com/g/100/100"
          style="height: 100px;width:100px;display:inline-block;"
        />
        <v-image
          circle
          bordered
          src="http://placekitten.com/g/100/100"
          style="height: 100px;width:100px;display:inline-block;margin-left: 10px"
        />

        <br />
        <br />
        <p>fit(none)</p>
        <v-image fit="none" src="http://placekitten.com/g/400/150" style="height: 100px;" />

        <br />
        <p>fit(contain)</p>
        <v-image fit="contain" src="http://placekitten.com/g/400/150" style="height: 100px;" />

        <br />
        <p>fit(cover)</p>
        <v-image fit="cover" src="http://placekitten.com/g/400/150" style="height: 100px;" />

        <br />
        <p>fit(fill)</p>
        <v-image fit="fill" src="http://placekitten.com/g/400/150" style="height: 100px;" />

        <br />
        <p>fit(scale-down)</p>
        <v-image fit="scale-down" src="http://placekitten.com/g/400/150" style="height: 100px;" />

        <br />
        <p>lazy</p>
        <v-grid cols={3}>
          {Array.from({ length: 60 }).map(() => (
            <v-grid-item>
              <v-image
                lazy
                src="http://placekitten.com/g/1000/1000"
                defaultSrc="https://via.placeholder.com/100x100?text=Loading"
              />
            </v-grid-item>
          ))}
        </v-grid>

        <br />
        <div style="height: 500px;overflow:auto">
          <v-grid cols={3}>
            {Array.from({ length: 60 }).map(() => (
              <v-grid-item>
                <v-image
                  lazy
                  src="http://placekitten.com/g/2000/2000"
                  defaultSrc="https://via.placeholder.com/100x100?text=Loading"
                />
              </v-grid-item>
            ))}
          </v-grid>
        </div>
      </div>
    );
  }
}
