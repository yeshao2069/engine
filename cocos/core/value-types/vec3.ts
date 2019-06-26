/*
 Copyright (c) 2016 Chukong Technologies Inc.
 Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.

 http://www.cocos.com

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated engine source code (the "Software"), a limited,
 worldwide, royalty-free, non-assignable, revocable and non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You shall
 not use Cocos Creator software for developing other software or tools that's
 used for developing games. You are not granted to publish, distribute,
 sublicense, and/or sell copies of Cocos Creator.

 The software or tools in this License Agreement are licensed, not sold.
 Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
*/

/**
 * @category core/value-types
 */

import CCClass from '../data/class';
import {clamp, vec3} from '../vmath';
import Mat4 from './mat4';
import { ValueType } from './value-type';

/**
 * 三维向量。
 */
export default class Vec3 extends ValueType {
    /**
     * x 分量。
     */
    public x: number;

    /**
     * y 分量。
     */
    public y: number;

    /**
     * z 分量。
     */
    public z: number;

    /**
     * 构造与指定向量相等的向量。
     * @param v 相比较的向量。
     */
    constructor (v: Vec3);

    /**
     * 构造具有指定分量的向量。
     * @param [x=0] 指定的 x 分量。
     * @param [y=0] 指定的 y 分量。
     * @param [z=0] 指定的 z 分量。
     */
    constructor (x?: number, y?: number, z?: number);

    constructor (x?: number | Vec3, y?: number, z?: number) {
        super();
        if (x && typeof x === 'object') {
            this.x = x.x;
            this.y = x.y;
            this.z = x.z;
        } else {
            this.x = x || 0;
            this.y = y || 0;
            this.z = z || 0;
        }
    }

    /**
     * 克隆当前向量。
     */
    public clone () {
        return new Vec3(this.x, this.y, this.z);
    }

    /**
     * 设置当前向量使其与指定向量相等。
     * @param other 相比较的向量。
     * @returns `this`
     */
    public set (other: Vec3) {
        this.x = other.x;
        this.y = other.y;
        this.z = other.z;
        return this;
    }

    /**
     * 判断当前向量是否与指定向量相等。
     * @param other 相比较的向量。
     * @returns 两向量的各分量都分别相等时返回 `true`；否则返回 `false`。
     */
    public equals (other: Vec3) {
        return this.x === other.x && this.y === other.y && this.z === other.z;
    }

    /**
     * 判断当前向量是否在误差范围 [-variance, variance] 内与指定向量相等。
     * @param other 相比较的向量。
     * @param variance 允许的误差，应为非负数。
     * @returns 当两向量的各分量都在指定的误差范围内分别相等时，返回 `true`；否则返回 `false`。
     */
    public fuzzyEquals (other: Vec3, variance: number) {
        if (this.x - variance <= other.x && other.x <= this.x + variance) {
            if (this.y - variance <= other.y && other.y <= this.y + variance) {
                if (this.z - variance <= other.z && other.z <= this.z + variance) {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * 返回当前向量的字符串表示。
     * @returns 当前向量的字符串表示。
     */
    public toString () {
        return `(${this.x.toFixed(2)}, ${this.y.toFixed(2)}, ${this.z.toFixed(2)})`;
    }

    /**
     * 根据指定的插值比率，从当前向量到目标向量之间做插值。
     * @param to 目标向量。
     * @param ratio 插值比率，范围为 [0,1]。
     * @param out 当此参数定义时，本方法将插值结果赋值给此参数并返回此参数。
     * @returns 当前向量各个分量到目标向量对应的各个分量之间按指定插值比率进行线性插值构成的向量。
     */
    public lerp (to: Vec3, ratio: number, out?: Vec3) {
        out = out || new Vec3();
        vec3.lerp(out, this, to, ratio);
        return out;
    }

    /**
     * 设置当前向量的值，使其各个分量都处于指定的范围内。
     * @param minInclusive 每个分量都代表了对应分量允许的最小值。
     * @param maxInclusive 每个分量都代表了对应分量允许的最大值。
     * @returns `this`
     */
    public clampf (minInclusive: Vec3, maxInclusive: Vec3) {
        this.x = clamp(this.x, minInclusive.x, maxInclusive.x);
        this.y = clamp(this.y, minInclusive.y, maxInclusive.y);
        this.z = clamp(this.z, minInclusive.z, maxInclusive.z);
        return this;
    }

    /**
     * 向量加法。将当前向量加上指定向量。
     * @param other 指定的向量。
     * @returns `this`
     */
    public addSelf (other: Vec3) {
        this.x += other.x;
        this.y += other.y;
        this.z += other.z;
        return this;
    }

    /**
     * 向量加法。将当前向量与指定向量的相加结果赋值给出口向量。
     * @param other 指定的向量。
     * @param [out] 出口向量，当未指定时将创建为新的向量。
     * @returns `out`
     */
    public add (other: Vec3, out?: Vec3) {
        out = out || new Vec3();
        out.x = this.x + other.x;
        out.y = this.y + other.y;
        out.z = this.z + other.z;
        return out;
    }

    /**
     * 向量减法。将当前向量减去指定向量。
     * @param other 减数向量。
     * @returns `this`
     */
    public subSelf (other: Vec3) {
        this.x -= other.x;
        this.y -= other.y;
        this.z -= other.z;
        return this;
    }

    /**
     * 向量减法。将当前向量减去指定向量的结果赋值给出口向量。
     * @param other 减数向量。
     * @param [out] 出口向量，当未指定时将创建为新的向量。
     * @returns `out`
     */
    public sub (other: Vec3, out?: Vec3) {
        out = out || new Vec3();
        out.x = this.x - other.x;
        out.y = this.y - other.y;
        out.z = this.z - other.z;
        return out;
    }

    /**
     * 向量数乘。将当前向量数乘指定标量。
     * @param scalar 标量乘数。
     * @returns `this`
     */
    public mulSelf (scalar: number) {
        this.x *= scalar;
        this.y *= scalar;
        this.z *= scalar;
        return this;
    }

    /**
     * 向量数乘。将当前向量数乘指定标量的结果赋值给出口向量。
     * @param scalar 标量乘数。
     * @param [out] 出口向量，当未指定时将创建为新的向量。
     * @returns `out`
     */
    public mul (scalar: number, out?: Vec3) {
        out = out || new Vec3();
        out.x = this.x * scalar;
        out.y = this.y * scalar;
        out.z = this.z * scalar;
        return out;
    }

    /**
     * 向量乘法。将当前向量乘以与指定向量。
     * @param other 指定的向量。
     * @returns `this`
     */
    public scaleSelf (other: Vec3) {
        this.x *= other.x;
        this.y *= other.y;
        this.z *= other.z;
        return this;
    }

    /**
     * 向量乘法。将当前向量乘以与指定向量的结果赋值给当前向量。
     * @param other 指定的向量。
     * @param [out] 出口向量，当未指定时将创建为新的向量。
     * @returns `out`
     */
    public scale (other: Vec3, out?: Vec3) {
        out = out || new Vec3();
        out.x = this.x * other.x;
        out.y = this.y * other.y;
        out.z = this.z * other.z;
        return out;
    }

    /**
     * 将当前向量的各个分量除以指定标量。相当于 `this.mulSelf(1 / scalar)`。
     * @param scalar 标量除数。
     * @returns `this`
     */
    public divSelf (scalar: number) {
        this.x /= scalar;
        this.y /= scalar;
        this.z /= scalar;
        return this;
    }

    /**
     * 将当前向量的各个分量除以指定标量的结果赋值给出口向量。相当于 `this.mul(1 / scalar, out)`。
     * @param scalar 标量除数。
     * @param [out] 出口向量，当未指定时将创建为新的向量。
     * @returns `out`
     */
    public div (scalar: number, out?: Vec3) {
        out = out || new Vec3();
        out.x = this.x / scalar;
        out.y = this.y / scalar;
        out.z = this.z / scalar;
        return out;
    }

    /**
     * 将当前向量的各个分量取反。
     * @returns `this`
     */
    public negSelf () {
        this.x = -this.x;
        this.y = -this.y;
        this.z = -this.z;
        return this;
    }

    /**
     * 将当前向量的各个分量取反的结果赋值给出口向量。
     * @param [out] 出口向量，当未指定时将创建为新的向量。
     * @returns `out`
     */
    public neg (out?: Vec3) {
        out = out || new Vec3();
        out.x = -this.x;
        out.y = -this.y;
        out.z = -this.z;
        return out;
    }

    /**
     * 向量点乘。
     * @param other 指定的向量。
     * @returns 当前向量与指定向量点乘的结果。
     */
    public dot (other: Vec3) {
        return this.x * other.x + this.y * other.y + this.z * other.z;
    }

    /**
     * 向量叉乘。将当前向量左叉乘指定向量的结果赋值给出口向量。
     * @param other 指定的向量。
     * @param [out] 出口向量，当未指定时将创建为新的向量。
     * @returns 当前向量左叉乘指定向量的结果。
     */
    public cross (other: Vec3, out?: Vec3) {
        out = out || new Vec3();
        vec3.cross(out, this, other);
        return out;
    }

    /**
     * 计算向量的长度（模）。
     * @returns 向量的长度（模）。
     */
    public mag () {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }

    /**
     * 计算向量长度（模）的平方。
     * @returns 向量长度（模）的平方。
     */
    public magSqr () {
        return this.x * this.x + this.y * this.y + this.z * this.z;
    }

    /**
     * 归一化当前向量，以使其长度（模）为 1。
     */
    public normalizeSelf () {
        vec3.normalize(this, this);
        return this;
    }

    /**
     * 将当前向量归一化的结果赋值给出口向量。
     * @param [out] 出口向量，当未指定时将创建为新的向量。
     * @returns `out`
     */
    public normalize (out?: Vec3) {
        out = out || new Vec3();
        vec3.normalize(out, this);
        return out;
    }

    /**
     * 将当前向量视为 w 分量为 1 的四维向量，
     * 应用四维矩阵变换到当前矩阵，结果的 x、y、z 分量赋值给出口向量。
     * @param matrix 变换矩阵。
     * @param [out] 出口向量，当未指定时将创建为新的向量。
     */
    public transformMat4 (matrix: Mat4, out?: Vec3) {
        out = out || new Vec3();
        vec3.transformMat4(out, this, matrix);
        return out;
    }
}

CCClass.fastDefine('cc.Vec3', Vec3, { x: 0, y: 0, z: 0 });
cc.Vec3 = Vec3;

/**
 * 等价于 `new Vec3(other)`。
 * @param other 相比较的向量。
 * @returns `new Vec3(other)`
 */
export function v3 (other: Vec3): Vec3;

/**
 * 等价于 `new Vec3(x, y, z)`。
 * @param [x=0] 指定的 x 分量。
 * @param [y=0] 指定的 y 分量。
 * @param [z=0] 指定的 z 分量。
 * @returns `new Vec3(x, y, z)`
 */
export function v3 (x?: number, y?: number, z?: number): Vec3;

export function v3 (x?: number | Vec3, y?: number, z?: number) {
    return new Vec3(x as any, y, z);
}

cc.v3 = v3;