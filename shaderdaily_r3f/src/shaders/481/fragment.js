import glsl from 'babel-plugin-glsl/macro'

const fragmentShader = glsl`
    float label(vec2 p)
    {
        p *= 10.;
        p.x -= 0.25;
        float left = sdFour(vec2(p.x + 0.3, p.y));
        float center = sdEight(vec2(p.x -0.035, p.y));
        float right = sdOne(vec2(p.x - 0.39, p.y));
        return left + center + right;
    }

    void main()
    {
        vec2 vUv = vec2(vUv.x, vUv.y);
        vec3 color = vec3(0.);
        float shape1;
        float shape2;
        float shape3;
        float shape4;
        vec2 newvUv = vUv;
        
        newvUv = newvUv * 2. - 0.5;
        newvUv.y -= 0.7;
        newvUv = Rot(newvUv, PI * 0.25);
        float k = 1. + 20. * (0.25 - 0.125);
        vec2 uv2 = newvUv;
        
        uv2.x += 1.;
        uv2.y -0.2;
        uv2 = Rot(uv2, PI * 0.5);
        
        for (int i=1; i<=15; i++)
        {
            shape1 += sdSegment(vec2(newvUv.x + sin(float(i) * u_time * 0.1), newvUv.y + cos(float(i) * u_time * 0.1)), vec2(0. + sin(u_time * float(i) * (0.1))), vec2(0.0 + cos(u_time * float(i) * 0.1)));
            
        }
        
        // color += shape1;
        color += shape1; 
        color += shape3;
        color += shape2;
        color += shape4;
        // // shape2 = rect(vec2(vUv.x, vUv.y), 1., 0.01);
        // // shape3 = rect(vec2(vUv.x, vUv.y), 0.01, 1.);
        
        // // color *= shape3;
        // // color += shape4;
        

        float numLabel = label(vUv);
        color += numLabel;
        gl_FragColor = vec4(color, 1.);
    }
`

export default fragmentShader