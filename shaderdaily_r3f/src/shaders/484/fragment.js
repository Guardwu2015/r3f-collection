import glsl from 'babel-plugin-glsl/macro'

const fragmentShader = glsl`
    float label(vec2 p)
    {
        p *= 10.;
        p.x -= 0.25;
        float left = sdFour(vec2(p.x + 0.3, p.y));
        float center = sdEight(vec2(p.x -0.035, p.y));
        float right = sdFour(vec2(p.x - 0.4, p.y));
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
        vec2 uv2 = vUv;
        
        
        // uv2.x += 1.;
        // uv2.y -0.2;
        // uv2 = Rot(uv2, PI * 0.5);
        uv2 = uv2 *5. - 2.25;
        // uv2 = Rot(uv2, u_time * 0.1);
        for (int i=1; i<=15; i++)
        {
            // uv2 = uv2 * 1.1 - 0.1;
            // uv2 = Rot(uv2, u_time * 0.05 * float(i));
            shape1 += sdSegment(vec2(uv2.x + (float(i) * sin(u_time) /10. ) , uv2.y + (float(i) * cos(u_time) /10. )), vec2(0.0), vec2(0.5));
            shape2 += sdSegment(vec2(uv2.x - (float(i) * sin(u_time) /10. ) , uv2.y - (float(i) * cos(u_time) /10. )), vec2(0.0), vec2(0.5));
            shape3 += sdSegment(vec2(uv2.x + (float(i) * sin(u_time) /10. ) , uv2.y - (float(i) * cos(u_time) /10. )), vec2(0.0), vec2(0.5));
            shape4 += sdSegment(vec2(uv2.x - (float(i) * sin(u_time) /10. ) , uv2.y + (float(i) * cos(u_time) /10. )), vec2(0.0), vec2(0.5));
            
        }
        
        color += shape1; 
        color += shape2;
        color += shape3; 
        color += shape4;  
        
        float numLabel = label(vUv);
        color += numLabel;
        gl_FragColor = vec4(color, 1.);
    }
`

export default fragmentShader