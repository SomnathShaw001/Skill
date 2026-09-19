#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
require("source-map-support/register");
const cdk = __importStar(require("aws-cdk-lib"));
const skillgraph_stack_1 = require("../lib/skillgraph-stack");
const app = new cdk.App();
new skillgraph_stack_1.SkillGraphStack(app, 'SkillGraphStack', {
    description: 'SkillGraph - Career Intelligence Platform (AWS Zero to Shipped Hackathon)',
    env: {
        account: process.env.CDK_DEFAULT_ACCOUNT || process.env.AWS_ACCOUNT_ID,
        region: process.env.CDK_DEFAULT_REGION || process.env.AWS_REGION || 'us-east-1',
    },
    tags: {
        Project: 'SkillGraph',
        Environment: 'Production',
        Hackathon: 'AWS-Zero-to-Shipped',
        Lane: 'Startup',
        Category: 'Commercial-Potential',
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2tpbGxncmFwaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNraWxsZ3JhcGgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsdUNBQXFDO0FBQ3JDLGlEQUFtQztBQUNuQyw4REFBMEQ7QUFFMUQsTUFBTSxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7QUFFMUIsSUFBSSxrQ0FBZSxDQUFDLEdBQUcsRUFBRSxpQkFBaUIsRUFBRTtJQUMxQyxXQUFXLEVBQUUsMkVBQTJFO0lBQ3hGLEdBQUcsRUFBRTtRQUNILE9BQU8sRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYztRQUN0RSxNQUFNLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsSUFBSSxXQUFXO0tBQ2hGO0lBQ0QsSUFBSSxFQUFFO1FBQ0osT0FBTyxFQUFFLFlBQVk7UUFDckIsV0FBVyxFQUFFLFlBQVk7UUFDekIsU0FBUyxFQUFFLHFCQUFxQjtRQUNoQyxJQUFJLEVBQUUsU0FBUztRQUNmLFFBQVEsRUFBRSxzQkFBc0I7S0FDakM7Q0FDRixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIjIS91c3IvYmluL2VudiBub2RlXG5pbXBvcnQgJ3NvdXJjZS1tYXAtc3VwcG9ydC9yZWdpc3Rlcic7XG5pbXBvcnQgKiBhcyBjZGsgZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0IHsgU2tpbGxHcmFwaFN0YWNrIH0gZnJvbSAnLi4vbGliL3NraWxsZ3JhcGgtc3RhY2snO1xuXG5jb25zdCBhcHAgPSBuZXcgY2RrLkFwcCgpO1xuXG5uZXcgU2tpbGxHcmFwaFN0YWNrKGFwcCwgJ1NraWxsR3JhcGhTdGFjaycsIHtcbiAgZGVzY3JpcHRpb246ICdTa2lsbEdyYXBoIC0gQ2FyZWVyIEludGVsbGlnZW5jZSBQbGF0Zm9ybSAoQVdTIFplcm8gdG8gU2hpcHBlZCBIYWNrYXRob24pJyxcbiAgZW52OiB7XG4gICAgYWNjb3VudDogcHJvY2Vzcy5lbnYuQ0RLX0RFRkFVTFRfQUNDT1VOVCB8fCBwcm9jZXNzLmVudi5BV1NfQUNDT1VOVF9JRCxcbiAgICByZWdpb246IHByb2Nlc3MuZW52LkNES19ERUZBVUxUX1JFR0lPTiB8fCBwcm9jZXNzLmVudi5BV1NfUkVHSU9OIHx8ICd1cy1lYXN0LTEnLFxuICB9LFxuICB0YWdzOiB7XG4gICAgUHJvamVjdDogJ1NraWxsR3JhcGgnLFxuICAgIEVudmlyb25tZW50OiAnUHJvZHVjdGlvbicsXG4gICAgSGFja2F0aG9uOiAnQVdTLVplcm8tdG8tU2hpcHBlZCcsXG4gICAgTGFuZTogJ1N0YXJ0dXAnLFxuICAgIENhdGVnb3J5OiAnQ29tbWVyY2lhbC1Qb3RlbnRpYWwnLFxuICB9LFxufSk7XG4iXX0=